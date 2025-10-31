const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-panel')
    .setDescription('Create a control panel embed in this channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction, client) {
    // Calculate uptime
    const ms = Date.now() - client.stats.startTime;
    const sec = Math.floor((ms / 1000) % 60);
    const min = Math.floor((ms / (1000 * 60)) % 60);
    const hr = Math.floor(ms / (1000 * 60 * 60));
    const uptimeStr = hr > 0 ? `${hr}h ${min}m ${sec}s` : `${min}m ${sec}s`;

    // Main embed
    const embed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setTitle('Bypass Control Panel')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(
        'Use the button below to securely process and bypass supported links.\n\n' +
        'This system prioritizes privacy and efficiency with every request.'
      )
      .addFields(
        {
          name: 'Overview',
          value:
            'The panel provides a seamless way to handle link bypassing directly within Discord. ' +
            'All results are sent privately and no data is stored.',
          inline: false
        },
        {
          name: 'Features',
          value:
            '• Fast link processing\n' +
            '• Smart caching for repeated links\n' +
            '• 50+ supported platforms\n' +
            '• Privacy-focused design\n' +
            '• Clean and responsive interface',
          inline: false
        }
      )
      .setFooter({
        text: `Bypass Bot • Uptime: ${uptimeStr}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp();

    // Buttons
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('bypass_button')
        .setLabel('Bypass Link')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('help_button')
        .setLabel('Help / Info')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
