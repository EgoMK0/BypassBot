const { SlashCommandBuilder, EmbedBuilder, version: djsVersion } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('overview')
    .setDescription('Displays current bot statistics and status information.'),
    
  async execute(interaction, client) {
    // Calculate uptime
    const uptime = Date.now() - client.stats.startTime;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const uptimeStr = `${days}d ${hours}h ${minutes}m`;

    // Embed
    const embed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setTitle('Bypass Bot Overview')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(
        'A detailed overview of the bot’s current performance and operational statistics.'
      )
      .addFields(
        { name: 'Total Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Total Bypasses', value: `${client.stats.totalBypasses}`, inline: true },
        { name: 'Auto-Bypass Channels', value: `${client.stats.autoBypassChannels.size}`, inline: true },
        { name: 'Uptime', value: uptimeStr, inline: true },
        { name: 'Bot Version', value: '1.0.0', inline: true },
        { name: 'Discord.js Version', value: djsVersion, inline: true }
      )
      .setFooter({
        text: `Bypass Bot • Statistics`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
