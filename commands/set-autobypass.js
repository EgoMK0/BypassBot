const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createSuccessEmbed, createInfoEmbed } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-autobypass')
        .setDescription('Enable or disable automatic link bypassing in this channel')
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('Enable or disable auto-bypass')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        const enabled = interaction.options.getBoolean('enabled');
        const channelId = interaction.channel.id;

        if (enabled) {
            client.stats.autoBypassChannels.add(channelId);
            const embed = createSuccessEmbed('Auto-Bypass Enabled', 
                `Automatic link bypassing has been enabled in this channel.\n\nSupported ad links will be automatically bypassed when posted.`
            );
            await interaction.reply({ embeds: [embed] });
        } else {
            client.stats.autoBypassChannels.delete(channelId);
            const embed = createInfoEmbed('Auto-Bypass Disabled', 
                `Automatic link bypassing has been disabled in this channel.`
            );
            await interaction.reply({ embeds: [embed] });
        }
    },
};
