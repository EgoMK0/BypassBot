# Discord Bypass Bot

## Overview
A Discord bot that bypasses ad links from Lazy Devs using trw.lat API (primary) and ace API (fallback). The bot provides slash commands for bypassing links, automatic link detection, and server management features.

## Features
- `/bypass` - Bypass ad links instantly
- `/set-autobypass` - Enable automatic bypassing in channels
- `/view-supported` - View all supported ad link services
- `/set-panel` - Create a control panel embed
- `/overview` - View bot statistics
- `/help` - Command guide
- `/faq` - Frequently asked questions
- `/credits` - Bot credits

## Project Structure
- `index.js` - Main bot file with event handlers
- `commands/` - All slash command files
- `utils/` - Utility functions for bypass and embeds
- `deploy-commands.js` - Script to register slash commands

## Setup Instructions

### 1. Environment Variables
Create a `.env` file with the following variables:
```
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_id
TRW_API_KEY=your_trw_lat_api_key
ACE_API_KEY=your_ace_api_key
```

### 2. Deploy Commands
Run `node deploy-commands.js` to register slash commands with Discord.

### 3. Start the Bot
Run `npm start` to start the bot.

## Dependencies
- discord.js v14 - Discord bot framework
- axios - HTTP requests for API calls
- dotenv - Environment variable management

## Recent Changes
- Initial bot setup with all commands implemented
- Bypass functionality with trw.lat and ace API fallback
- Auto-bypass feature for automatic link detection
- Clean embed responses without excessive emojis

## User Preferences
- Minimal emoji usage in responses
- Clean, professional embeds
- Fast response times with API fallback system
