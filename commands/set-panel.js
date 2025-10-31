const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-panel')
        .setDescription('Create a control panel embed in this channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        const uptime = Date.now() - client.stats.startTime;
        const hours = Math.floor(uptime / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
        const uptimeStr = hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`;

        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Bypass Panel')
            .setDescription('Click the button below to bypass a link!')
            .addFields(
                { name: 'Features:', value: '• Fast bypass processing\n• Smart caching\n• 50+ supported services\n• AI-powered safety\n• Private results', inline: false }
            )
            .setFooter({ text: `Bypass Bot | Uptime: ${uptimeStr}` })
            .setTimestamp();

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
