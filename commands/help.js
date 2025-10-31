const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of all commands and their descriptions.'),
    
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x2B2D31)
      .setTitle('Bypass Bot Command Reference')
      .setDescription(
        'Below is an overview of all available commands and their functions.\n' +
        'Use these to interact with the bot efficiently and securely.'
      )
      .addFields(
        {
          name: '/bypass <url>',
          value:
            'Bypasses a supported advertisement or redirect link.\n' +
            'Provide the full URL to process.\n' +
            '**Example:** `/bypass https://linkvertise.com/example`',
          inline: false
        },
        {
          name: '/set-autobypass <enabled>',
          value:
            'Enables or disables automatic link bypassing in the current channel.\n' +
            'When enabled, supported links are processed automatically.\n' +
            '**Example:** `/set-autobypass enabled:true`',
          inline: false
        },
        {
          name: '/view-supported',
          value:
            'Displays a list of all supported link services compatible with the bypass system.',
          inline: false
        },
        {
          name: '/set-panel',
          value:
            'Creates an interactive control panel embed that provides quick access to core bot features and system statistics.\n' +
            'Requires **Manage Channels** permission.',
          inline: false
        },
        {
          name: '/overview',
          value:
            'Shows detailed statistics including total bypasses, uptime, and server count.',
          inline: false
        },
        {
          name: '/faq',
          value:
            'Displays answers to frequently asked questions regarding the bot and its functionality.',
          inline: false
        },
        {
          name: '/credits',
          value:
            'Displays bot credits and acknowledgments for contributors and developers.',
          inline: false
        }
      )
      .setFooter({ text: 'Bypass Bot • Use /faq for more information' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
