const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('View bot credits and acknowledgments'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Credits')
            .addFields(
                {
                    name: 'Developer',
                    value: 'Xohus',
                    inline: true
                },
                {
                    name: 'Helper',
                    value: 'zeus',
                    inline: true
                },
                {
                    name: 'APIs',
                    value: 'trw.lat, ace API',
                    inline: true
                }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
