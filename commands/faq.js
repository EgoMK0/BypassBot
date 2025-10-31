const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faq')
        .setDescription('View frequently asked questions'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Frequently Asked Questions')
            .setDescription('Common questions and answers about the Bypass Bot:')
            .addFields(
                {
                    name: 'Q: What ad link services are supported?',
                    value: 'A: Use the `/view-supported` command to see a full list of supported services. The bot supports most major ad link platforms including Linkvertise, LootDest, and more.',
                    inline: false
                },
                {
                    name: 'Q: How does the bot bypass links?',
                    value: 'A: The bot uses the trw.lat API as the primary service and falls back to the ace API if needed. Both APIs are specialized in bypassing ad links.',
                    inline: false
                },
                {
                    name: 'Q: What is auto-bypass?',
                    value: 'A: Auto-bypass automatically detects and bypasses supported ad links when they are posted in a channel. Enable it with `/set-autobypass enabled:true`.',
                    inline: false
                },
                {
                    name: 'Q: Why did my bypass fail?',
                    value: 'A: Bypasses can fail if the link is not supported, the API is down, or the link format is invalid. Make sure you are using a full URL starting with http:// or https://.',
                    inline: false
                },
                {
                    name: 'Q: Is the bot free to use?',
                    value: 'A: Yes, the bot is free to use. However, API rate limits may apply based on the bypass service providers.',
                    inline: false
                },
                {
                    name: 'Q: Can I use this bot in multiple servers?',
                    value: 'A: Yes, you can invite the bot to as many servers as you need.',
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Still have questions? Contact the bot owner' });

        await interaction.reply({ embeds: [embed] });
    },
};
