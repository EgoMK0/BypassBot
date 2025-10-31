const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('overview')
        .setDescription('View bot statistics and overview'),
    async execute(interaction, client) {
        const uptime = Date.now() - client.stats.startTime;
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Bot Overview')
            .setDescription('Current bot statistics and information')
            .addFields(
                { name: 'Total Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Total Bypasses', value: `${client.stats.totalBypasses}`, inline: true },
                { name: 'Auto-Bypass Channels', value: `${client.stats.autoBypassChannels.size}`, inline: true },
                { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m`, inline: true },
                { name: 'Bot Version', value: '1.0.0', inline: true },
                { name: 'Discord.js Version', value: require('discord.js').version, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Bypass Bot Statistics' });

        await interaction.reply({ embeds: [embed] });
    },
};
