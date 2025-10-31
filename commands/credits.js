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
                    name: 'Main Developers',
                    value: 'xohus\nLazy Devs',
                    inline: false
                },
                {
                    name: 'Helper',
                    value: 'zeus',
                    inline: false
                },
                {
                    name: 'APIs Used',
                    value: 'trw.lat\nace API',
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Bypass Bot v1.0.0' });

        await interaction.reply({ embeds: [embed] });
    },
};
