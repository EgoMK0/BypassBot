const { SlashCommandBuilder } = require('discord.js');
const { createInfoEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view-supported')
        .setDescription('View all supported ad link services'),
    async execute(interaction) {
        const supportedServices = [
            'Linkvertise',
            'LootDest',
            'LootLinks',
            'Work.ink',
            'Sub2Unlock',
            'Rekonise',
            'Letsboost',
            'SocialWolvez',
            'Mboost',
            'Mega.link',
            'ClaimGG',
            'Loot-Link',
            'Loot-Links.com',
            'Adrinolinks',
            'ShortLy',
            'UploadHaven',
            'CoronaVirusMap',
            'Linkify',
            'BoostHub'
        ];

        const description = supportedServices.map((service, index) => `${index + 1}. ${service}`).join('\n');

        const embed = createInfoEmbed('Supported Services', 
            `The following ad link services are supported:\n\n${description}\n\n**Note:** Support may vary based on API availability.`
        );

        await interaction.reply({ embeds: [embed] });
    },
};
