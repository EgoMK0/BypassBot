const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-panel')
        .setDescription('Create a control panel embed in this channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Bypass Bot Control Panel')
            .setDescription('Welcome to the Bypass Bot control panel. Click the button below to bypass a link.')
            .addFields(
                { name: '/bypass', value: 'Bypass an ad link instantly', inline: true },
                { name: '/set-autobypass', value: 'Toggle auto-bypass for this channel', inline: true },
                { name: '/view-supported', value: 'View supported services', inline: true },
                { name: '/overview', value: 'View bot statistics', inline: true },
                { name: '/help', value: 'Get help with commands', inline: true },
                { name: '/faq', value: 'View frequently asked questions', inline: true }
            )
            .addFields(
                { name: 'Bot Statistics', value: `Servers: ${client.guilds.cache.size}\nTotal Bypasses: ${client.stats.totalBypasses}`, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Bypass Bot - Ad Link Bypassing Made Easy' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bypass_button')
                    .setLabel('Bypass Link')
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};
