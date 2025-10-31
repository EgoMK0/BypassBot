require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
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
    if (!interaction.isChatInputCommand()) return;

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
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    
    if (client.stats.autoBypassChannels.has(message.channel.id)) {
        const linkPattern = /(https?:\/\/[^\s]+)/g;
        const links = message.content.match(linkPattern);
        
        if (links && links.length > 0) {
            const { bypassLink } = require('./utils/bypass');
            for (const link of links) {
                if (link.includes('linkvertise') || link.includes('lootdest') || link.includes('lootlinks')) {
                    const result = await bypassLink(link);
                    if (result.success) {
                        await message.reply({
                            content: `Bypassed link: ${result.url}`,
                        });
                        client.stats.totalBypasses++;
                    }
                }
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
