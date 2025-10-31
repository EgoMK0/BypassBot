# Discord Bypass Bot

A powerful Discord bot that automatically bypasses ad links using multiple API services.

## Features

- Bypass ad links instantly with `/bypass`
- Automatic link detection and bypassing
- Support for 19+ ad link services
- Clean, minimal interface
- Reliable fallback system with multiple APIs

## Commands

- `/bypass <url>` - Bypass an ad link
- `/set-autobypass <enabled>` - Toggle automatic bypassing
- `/view-supported` - View supported services
- `/set-panel` - Create control panel
- `/overview` - View bot statistics
- `/help` - Command help guide
- `/faq` - Frequently asked questions
- `/credits` - Bot credits

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your Discord bot token and API keys
3. Run `node deploy-commands.js` to register commands
4. Run `npm start` to start the bot

## Supported Services

Linkvertise, LootDest, LootLinks, Work.ink, Sub2Unlock, Rekonise, Letsboost, SocialWolvez, Mboost, Mega.link, ClaimGG, Loot-Link, and more.

## License

ISC
