# Minecraft Always Online Bot

This project runs a Minecraft bot that connects to a server and helps keep it active by staying logged in and moving around automatically. It is built as a lightweight wrapper around the `mineboty` package, with local configuration now managed through `.env`.

## What It Does

- Connects a bot account to your Minecraft server.
- Sends a configurable login message after joining.
- Randomly moves at intervals so the bot stays active.
- Can automatically skip night if enabled.
- Supports built-in `mineboty` chat commands such as guarding an area, fighting players, sleeping, and changing time or weather.

## How It Works

- [index.js](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\index.js:1) loads values from `.env`.
- It generates [config.json](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\config.json:1) from those values.
- Then it starts `mineboty()`, which reads `config.json` and launches the bot.

`config.json` is still present because the `mineboty` package requires it, but you should treat `.env` as the source of truth.

## Project Files

- [index.js](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\index.js:1): Bootstraps environment variables and starts the bot.
- [.env.example](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\.env.example:1): Template for local configuration.
- [.env](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\.env:1): Your real local settings.
- [config.json](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\config.json:1): Generated runtime config used by `mineboty`.
- [launcher_accounts.json](d:\GitHub Repo\Personal projects\Minecraft_Always_Online_Bot\launcher_accounts.json:1): Present in the repo, but not used by the bootstrap code in this project.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local env file from the example:

```bash
copy .env.example .env
```

3. Edit `.env` with your server details:

```env
MINECRAFT_SERVER_IP=play.example.com
MINECRAFT_SERVER_PORT=25565
MINECRAFT_BOT_NAME=OnlineBOT
MINECRAFT_PASSWORD=
MINECRAFT_AUTH=offline
MINECRAFT_AUTO_NIGHT_SKIP=false
MINECRAFT_LOGIN_MESSAGE=The server will always be online!
```

## Running

Start the bot with:

```bash
npm start
```

This will regenerate `config.json` from `.env` and then launch the bot.

## Available Configuration

- `MINECRAFT_SERVER_IP`: Minecraft server hostname or IP.
- `MINECRAFT_SERVER_PORT`: Server port.
- `MINECRAFT_BOT_NAME`: Bot username.
- `MINECRAFT_PASSWORD`: Password if your auth flow requires one.
- `MINECRAFT_AUTH`: Auth mode, typically `offline` unless your setup needs something else.
- `MINECRAFT_AUTO_NIGHT_SKIP`: Set to `true` to make the bot try to set day automatically at night.
- `MINECRAFT_LOGIN_MESSAGE`: Message the bot sends after login.

## Notes

- This project depends heavily on the behavior of the third-party `mineboty` package.
- Some advanced options supported internally by `mineboty` are not exposed through `.env` yet.
- The package appears to support extra in-game commands such as guard, fight, sleep, wakeup, and time or weather changes.
- For commands that change world state, the bot may need server permissions or operator access.
