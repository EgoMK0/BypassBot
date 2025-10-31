const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with bot commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Bot Help Guide')
            .setDescription('Here are all available commands and how to use them:')
            .addFields(
                {
                    name: '/bypass <url>',
                    value: 'Bypass an ad link. Provide the full URL of the ad link you want to bypass.\n**Example:** `/bypass https://linkvertise.com/example`',
                    inline: false
                },
                {
                    name: '/set-autobypass <enabled>',
                    value: 'Enable or disable automatic bypassing in the current channel. When enabled, the bot will automatically detect and bypass supported ad links.\n**Example:** `/set-autobypass enabled:true`',
                    inline: false
                },
                {
                    name: '/view-supported',
                    value: 'Display a list of all supported ad link services that can be bypassed.',
                    inline: false
                },
                {
                    name: '/set-panel',
                    value: 'Create a control panel embed with quick access to bot features and stats. Requires Manage Channels permission.',
                    inline: false
                },
                {
                    name: '/overview',
                    value: 'View detailed bot statistics including total bypasses, active servers, and uptime.',
                    inline: false
                },
                {
                    name: '/faq',
                    value: 'View frequently asked questions and their answers.',
                    inline: false
                },
                {
                    name: '/credits',
                    value: 'View bot credits and acknowledgments.',
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Need more help? Check /faq' });

        await interaction.reply({ embeds: [embed] });
    },
};
