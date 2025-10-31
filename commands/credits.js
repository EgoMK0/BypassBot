const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('View bot credits and acknowledgments'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Credits & Acknowledgments')
            .setDescription('Thanks to everyone who made this bot possible:')
            .addFields(
                {
                    name: 'Bot Developer',
                    value: 'Created with Discord.js',
                    inline: false
                },
                {
                    name: 'APIs Used',
                    value: 'trw.lat - Primary bypass API\nace API - Fallback bypass API',
                    inline: false
                },
                {
                    name: 'Libraries',
                    value: 'discord.js - Discord bot framework\naxios - HTTP client\ndotenv - Environment configuration',
                    inline: false
                },
                {
                    name: 'Special Thanks',
                    value: 'Thanks to the Discord.js community and all the users who support this bot.',
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Bypass Bot v1.0.0' });

        await interaction.reply({ embeds: [embed] });
    },
};
