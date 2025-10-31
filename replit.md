# Discord Bypass Bot

## Overview
A Discord bot that bypasses ad links using trw.lat API (primary) and ace API (fallback). The bot provides slash commands for bypassing links, automatic link detection with message deletion, and interactive bypass panel with DM delivery.

## Features
- `/bypass` - Bypass ad links with copy button
- `/set-autobypass` - Enable automatic bypassing in channels (deletes messages, DMs results)
- `/view-supported` - View all 50+ supported ad link services
- `/set-panel` - Create an interactive bypass panel with button and modal
- `/overview` - View bot statistics
- `/help` - Command guide
- `/faq` - Frequently asked questions
- `/credits` - Bot credits

## Supported Services (50+)
codex, trigon, rekonise, linkvertise, paster-so, cuttlinks, boost-ink-and-bst-gg, keyguardian, bstshrt, hadfoc.us, bit.do, bit.ly, blox-script, boost.ink, cuty-cuttlinks, getpolsec, is.gd, Link-hub.net, Link4m.com, Linkunlock, mboost, mediafire, pastebin.com, pastes.io, quartyz, rebrand.ly, rentry.co, rinku-pro, rkns.link, shorter.me, sub2get.com, sub2unlock.net, socialwolvez.com, sub4unlock.com, t.co, t.ly, tiny.cc, tinylink.onl, tpi.li, unlocknow.net, ytsubme, tinyurl.com, v.gd, delta, krnl, platoboost, and more.

## Project Structure
- `index.js` - Main bot file with event handlers, button/modal interactions
- `commands/` - All slash command files
- `utils/` - Utility functions (bypass, embeds, supported services)
- `deploy-commands.js` - Script to register slash commands

## Setup Instructions

### 1. Environment Variables
The bot uses the following secrets:
- DISCORD_TOKEN - Your Discord bot token
- CLIENT_ID - Your Discord application ID
- TRW_API_KEY - Your trw.lat API key
- ACE_API_KEY - Your ace API key

### 2. Deploy Commands
Run `node deploy-commands.js` to register slash commands with Discord.

### 3. Start the Bot
The bot runs automatically via the "Discord Bot" workflow.

## API Endpoints
- TRW API: `https://trw.lat/api/bypass?url={link}`
- ACE API: `http://ace-bypass.com/api/bypass?url={link}&apikey={key}`

## Dependencies
- discord.js v14 - Discord bot framework
- axios - HTTP requests for API calls
- dotenv - Environment variable management

## Recent Changes
- Updated supported services list to 50+ services without emojis
- Added copy buttons to all bypass results (sends link in backticks)
- Updated bypass panel with features list and uptime display
- Fixed auto-bypass to delete messages and DM results
- Updated credits to show Xohus as developer
- Added interactive modal form for panel bypass button

## Credits
- Developer: Xohus
- Helper: zeus
- APIs: trw.lat, ace API
