const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { glob } = require("glob");
const moment = require("moment");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("node:fs");
const Discord = require("discord.js");
const { readdirSync, read } = require("fs");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  const eventFiles = await globPromise(`${process.cwd()}/Events/*/*.js`);
  console.log(`---------------------------------------------`);
  console.log(`✅ [ EVENTS ] - LOADED`);

  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/slashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    arrayOfSlashCommands.push(file);
  });

  client.on("messageCreate", async (message, user) => {
    if (message.content.startsWith(`${config.env.prefix}deploy`)) {
      try {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
          return message.reply(
            `**You cannot use this \`Deploy\` command!**\n> **There are \`${arrayOfSlashCommands.length} Slash-Commands\` for ${client.user.username}!**`
          );
        }
        let themsg = await message.reply(
          `*Attempting to set the GUILD Slash Commands in \`${message.guild.name}...\`*`
        );
        await client.application.commands
          .set(arrayOfSlashCommands)
          .then((slashCommandsData) => {
            themsg.edit(
              `*Starting to load \`${slashCommandsData.size}\` slash commands to this guild...*\n _It's recommended to use command __2-4x__ times to ensure acurate deploy_`
            );
          })
          .catch((e) => {
            console.log(e);

            const errorbutton = new MessageActionRow().addComponents(
              new MessageButton()
                .setStyle("LINK")
                .setLabel("Invite Me")
                .setURL(
                  `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
                )
            );
            const errorloading = new MessageEmbed()
              .setTitle(
                `Couldn't load the Slash Commands for \`${message.guild.name}\`\nI must be missing permissions to create Slash-Commands!\n\nClick "Invite me" below!`
              )
              .setColor("RED");

            themsg.edit({ embeds: [errorloading], components: [errorbutton] });
          });
      } catch (e) {
        console.log(String(e.stack));

        const buttonerror = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setLabel("Join Support Server")
            .setURL("https://supremedev.xyz")
        );
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setColor(`RED`)
              .setTitle(`❌ Something want wrong!`)
              .setDescription(
                `This error isn't supposed to happen! This must be a code error! Join discord.gg/zendev for help!`
              ),
          ],
          components: [buttonerror],
        });
      }
    }
  });

  mongoose
    .connect(process.env.mongoURL || client.config.mongoDB.mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(
      console.log(`✅ [ CONNECTED TO MONGO DATABASE ]`),
      console.log(`---------------------------------------------`)
    );
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
