<div align="center">
  
  ![Discord](https://img.shields.io/discord/948744977524097116?logo=discord&style=for-the-badge)
  
</div>

---------
<p align="center">
  <a href="https://discord.gg/VzGNhtmmfB"><img src="https://discordapp.com/api/guilds/948744977524097116/widget.png?style=banner2" alt="Discord server"></a>
</p>

---------
# Discord.js v13 Handler Template

**I suggest downloading the template handler in the [Release](https://github.com/benzmeister/Discord.js-V13-SlashCommand-Handler/releases/tag/v1.0.2) column to avoid errors.**

---------
## ⚙️ Configuration
- ⚠️ Never share your tokens or api keys to other or make it publicly
- To start the Handler use `node cluster.js` or `node .`
- Modify `config.json` and fill out the values:
```env
{
  "env": {
    "TOKEN": "TOKEN_HERE",
    "prefix": "//",
    "activity": "Supreme Development",
    "status": "online",
    "about": "[ MODERATION, MUSIC, All-IN-ONE, OTC ]"
  },

  "mongoDB": {
    "mongoURL": "YOUR_MONGODB_HERE"
  },

  "client_owners": ["YOUR_ID_HERE"],

  "emoji": {
    "wrong": "<:zen_wrong:1006769964088311888>",
    "right": "<:zen_check:1006769471555371128>",
    "loading": "<a:zen_loading2:996274739930742885>",
    "connected": "<:zen_greend:1006770445426622515>"
  },

  "color": {
    "main": "WHITE",
    "error": "RED",
    "success": "GREEN",

    "red": "#ff5a48",
    "orange": "#ffca4d",
    "yellow": "#ffcc5c",
    "green": "#74ff89",
    "purple": "#7d5eff",
    "pink": "#ff88d2",
    "grey": "#4b4b4b",
    "white": "#ffffff"
  }
}

```
---------
- Slash Command Structures
```env
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "",
  cooldown: 5,
  description: "",
  type: "CHAT_INPUT",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    //Put your codes here
  },
};

/*
// ================< ==================== >================= //
//                                                           //
//            Handlers Coded by benzmeister#4424             //
//                                                           //
//               Work from Supreme Development               //
//                                                           //
//                  https://supremedev.xyz                   //
//                                                           //
//                    All Right Reserved!                    //
//                                                           //
// ================< ==================== >================= //
*/

```
---------
## 💝 Credits

*If you consider using our template, make sure to give Credits!*

**[Supreme Development](https://discord.supremedev.xyz) | [Website](https://supremedev.xyz) | [Discord](https://discord.gg/ZrNzZYc7Dv)**
---------

## 📜 License
![Github license](https://img.shields.io/github/license/benzmeister/Discord.js-v13-slash-Command-Handler?style=for-the-badge)
