require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
client.stats = {
    totalBypasses: 0,
    startTime: Date.now(),
    autoBypassChannels: new Set(),
};

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Bot is ready and serving ${client.guilds.cache.size} servers`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}:`, error);
            const errorMessage = { content: 'There was an error while executing this command.', ephemeral: true };
            
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId === 'bypass_button') {
            const modal = new ModalBuilder()
                .setCustomId('bypass_modal')
                .setTitle('Bypass Ad Link');

            const linkInput = new TextInputBuilder()
                .setCustomId('link_input')
                .setLabel('Enter the ad link to bypass')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('https://example.com/adlink')
                .setRequired(true);

            const actionRow = new ActionRowBuilder().addComponents(linkInput);
            modal.addComponents(actionRow);

            await interaction.showModal(modal);
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'bypass_modal') {
            await interaction.deferReply({ ephemeral: true });
            
            const url = interaction.fields.getTextInputValue('link_input');
            const { bypassLink } = require('./utils/bypass');
            const { createSuccessEmbed, createErrorEmbed } = require('./utils/embeds');

            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                const embed = createErrorEmbed('Invalid URL', 'Please provide a valid URL starting with http:// or https://');
                return await interaction.editReply({ embeds: [embed], ephemeral: true });
            }

            const result = await bypassLink(url);

            if (result.success) {
                client.stats.totalBypasses++;
                const embed = createSuccessEmbed('Bypass Successful', 
                    `**Original URL:** ${url}\n\n**Bypassed URL:** ${result.url}\n\n**API Used:** ${result.api}`
                );
                
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`copy_modal_${Date.now()}`)
                            .setLabel('Copy Link')
                            .setStyle(ButtonStyle.Primary)
                    );
                
                try {
                    const dmMessage = await interaction.user.send({ embeds: [embed], components: [row] });
                    
                    const dmCollector = dmMessage.createMessageComponentCollector({ time: 60000 });
                    dmCollector.on('collect', async i => {
                        await i.reply({ content: `\`${result.url}\``, ephemeral: true });
                    });
                    
                    await interaction.editReply({ content: 'Bypass successful! Check your DMs for the result.', ephemeral: true });
                } catch (error) {
                    const fallbackResponse = await interaction.editReply({ embeds: [embed], components: [row], ephemeral: true });
                    
                    const fallbackCollector = fallbackResponse.createMessageComponentCollector({ time: 60000 });
                    fallbackCollector.on('collect', async i => {
                        if (i.user.id === interaction.user.id) {
                            await i.reply({ content: `\`${result.url}\``, ephemeral: true });
                        } else {
                            await i.reply({ content: 'This button is not for you.', ephemeral: true });
                        }
                    });
                }
            } else {
                const embed = createErrorEmbed('Bypass Failed', 
                    `Could not bypass the provided link.\n\n**Error:** ${result.error}\n\nMake sure the link is supported and try again.`
                );
                await interaction.editReply({ embeds: [embed], ephemeral: true });
            }
        }
    }
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    
    if (client.stats.autoBypassChannels.has(message.channel.id)) {
        const linkPattern = /(https?:\/\/[^\s]+)/g;
        const links = message.content.match(linkPattern);
        
        if (links && links.length > 0) {
            const { bypassLink } = require('./utils/bypass');
            const { isAdLink } = require('./utils/supportedServices');
            const { createSuccessEmbed, createErrorEmbed } = require('./utils/embeds');
            
            let hasAdLink = false;
            let allResultsDelivered = true;
            
            for (const link of links) {
                if (isAdLink(link)) {
                    hasAdLink = true;
                    const result = await bypassLink(link);
                    
                    let embed;
                    let row;
                    
                    if (result.success) {
                        client.stats.totalBypasses++;
                        embed = createSuccessEmbed('Auto-Bypass Successful', 
                            `**Original URL:** ${link}\n\n**Bypassed URL:** ${result.url}\n\n**API Used:** ${result.api}`
                        );
                        
                        row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`copy_auto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
                                    .setLabel('Copy Link')
                                    .setStyle(ButtonStyle.Primary)
                            );
                    } else {
                        embed = createErrorEmbed('Auto-Bypass Failed', 
                            `**Original URL:** ${link}\n\n**Error:** ${result.error}\n\nThe link could not be bypassed.`
                        );
                    }
                    
                    try {
                        const dmMessage = await message.author.send({ embeds: [embed], components: row ? [row] : [] });
                        
                        if (result.success && row) {
                            const dmCollector = dmMessage.createMessageComponentCollector({ time: 60000 });
                            dmCollector.on('collect', async i => {
                                await i.reply({ content: `\`${result.url}\``, ephemeral: true });
                            });
                        }
                    } catch (error) {
                        console.error('Could not DM user, posting in channel instead:', error);
                        try {
                            const replyMessage = await message.reply({ embeds: [embed], components: row ? [row] : [] });
                            
                            if (result.success && row) {
                                const replyCollector = replyMessage.createMessageComponentCollector({ time: 60000 });
                                replyCollector.on('collect', async i => {
                                    if (i.user.id === message.author.id) {
                                        await i.reply({ content: `\`${result.url}\``, ephemeral: true });
                                    }
                                });
                            }
                        } catch (replyError) {
                            console.error('Could not send reply:', replyError);
                            allResultsDelivered = false;
                        }
                    }
                }
            }
            
            if (hasAdLink && allResultsDelivered) {
                try {
                    await message.delete();
                } catch (error) {
                    console.error('Could not delete message:', error);
                }
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
