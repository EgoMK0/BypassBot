const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { bypassLink } = require('../utils/bypass');
const { createSuccessEmbed, createErrorEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bypass')
        .setDescription('Bypass an ad link')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The ad link to bypass')
                .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply();

        const url = interaction.options.getString('url');
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            const embed = createErrorEmbed('Invalid URL', 'Please provide a valid URL starting with http:// or https://');
            return await interaction.editReply({ embeds: [embed] });
        }

        const result = await bypassLink(url);

        if (result.success) {
            client.stats.totalBypasses++;
            const embed = createSuccessEmbed('Bypass Successful', 
                `**Original URL:** ${url}\n\n**Bypassed URL:** ${result.url}\n\n**API Used:** ${result.api}`
            );
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`copy_${Date.now()}`)
                        .setLabel('Copy Link')
                        .setStyle(ButtonStyle.Primary)
                );
            
            const response = await interaction.editReply({ embeds: [embed], components: [row] });
            
            const collector = response.createMessageComponentCollector({ time: 60000 });
            collector.on('collect', async i => {
                if (i.user.id === interaction.user.id) {
                    await i.reply({ content: `\`${result.url}\``, ephemeral: true });
                }
            });
        } else {
            const embed = createErrorEmbed('Bypass Failed', 
                `Could not bypass the provided link.\n\n**Error:** ${result.error}\n\nMake sure the link is supported and try again.`
            );
            await interaction.editReply({ embeds: [embed] });
        }
    },
};
