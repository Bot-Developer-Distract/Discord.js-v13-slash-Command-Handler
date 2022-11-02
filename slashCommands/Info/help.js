const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
} = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
  name: "help",
  description: "Shows Help Embed of the Bot!",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   *
   */
  run: async (client, interaction) => {
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
    let date = new Date();
    let timestamp = date.getTime() - Math.floor(client.uptime);

    const helpembed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.username} | Help Panel | Overview Page`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor("WHITE")
      .addFields({
        name: `Bot Features:`,
        value: `>>> ***${client.user}** I'm a Multipurposes Bot with many features like Ticket, Moderation and Fun systems, with more coming soon!*`,
        inline: true,
      })
      .addFields({
        name: `Bot Stats:`,
        value: `>>> <a:zen_stats:992274460163981322> **Bot Ping:** \` ${
          client.ws.ping
        }ms \`\n<:zen_stats:1006769933197250600> **Bot Uptime:** *<t:${Math.floor(
          timestamp / 1000
        )}:R>*\n<:zen_slashC:1006785200505749574> **slashC:** \` ${
          arrayOfSlashCommands.length
        } \`\n<:zen_stack:961768248242753628> **Commands:** \` ${
          client.commands.size
        } \``,
        inline: true,
      })
      .addFields({
        name: `Developer:`,
        value: `> *This amazing bot was coded by the only, [👑 benzmeister](https://dev-benzmeister.tk), with many features available and more coming soon!*`,
        inline: true,
      })
      .setFooter({
        text: `Use the menu to view all my commands!`,
      });

    const adminpage = new MessageEmbed()
      .setAuthor({ name: `${client.user.username} | Help Panel | Admin Page` })
      .addFields(
        { name: `\`/ban\``, value: `*Bans a user*`, inline: true },
        {
          name: `\`/purge\``,
          value: `*Purge some messages within the channel*`,
          inline: true,
        },
        {
          name: `\`/ticket-rmvuser\``,
          value: `*Remove a user from the ticket*`,
          inline: true,
        },
        {
          name: `\`/ticket-adduser\``,
          value: `*Add a user to the ticket*`,
          inline: true,
        },
        { name: `\`/delwarn\``, value: `*Remove a users warn*`, inline: true },
        { name: `\`/kick\``, value: `*Kick a user*`, inline: true },
        { name: `\`/warn\``, value: `*Warn a user*`, inline: true }
      )
      .setColor("WHITE")
      .setFooter({
        text: `Page 1 • 6`,
        iconURL: client.user.displayAvatarURL(),
      });

    const funpage = new MessageEmbed()
      .setAuthor({ name: `This Fun are not yet implimented to the bot` })
      .addFields(
        {
          name: `\`/balance\``,
          value: `*View a users custom bank values*`,
          inline: true,
        },
        { name: `\`/beg\``, value: `*Beg for coins*`, inline: true },
        {
          name: `\`/daily\``,
          value: `*Get a daily amount of Coins*`,
          inline: true,
        },
        {
          name: `\`/invest\``,
          value: `*Invest your coins into tokens*`,
          inline: true,
        },
        {
          name: `\`/order\``,
          value: `*Order an item from our store*`,
          inline: true,
        },
        {
          name: `\`/store\``,
          value: `*View our store & its items*`,
          inline: true,
        },
        {
          name: `\`/weekly\``,
          value: `*Get a weekly amount of Coins*`,
          inline: true,
        },
        {
          name: `\`/work\``,
          value: `*Do a job to get a certain amount of Coins*`,
          inline: true,
        }
      )
      .setColor("WHITE")
      .setFooter({
        text: `Page 2 • 2`,
        iconURL: client.user.displayAvatarURL(),
      });

    let msgSelect = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("msgSelect")
        .setPlaceholder("Click me to view my options")
        .setMinValues(1)
        .setMaxValues(6)
        .addOptions(
          {
            label: "Admin",
            value: "adminpage",
            emoji: "1006769647305117776",
            description: "Admin Commands",
          },
          {
            label: "Fun",
            value: "funpage",
            emoji: "1006785065700818975",
            description: "Fun Commands",
          }
        )
    );

    var messageSent = await interaction.reply({
      embeds: [helpembed],
      components: [msgSelect],
    });

    const filter = (interaction) => {
      if (interaction.user.id === interaction.user.id) return true;
      return interaction.reply({
        content: `***You cannot use this menu***`,
        ephemeral: true,
      });
    };

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 120000,
    });

    collector.on("collect", (interaction) => {
      if (interaction.values[0] === "adminpage") {
        interaction.reply({ embeds: [adminpage], ephemeral: true });
      } else if (interaction.values[0] === "funpage") {
        interaction.reply({ embeds: [funpage], ephemeral: true });
      }
    });
    collector.on("end", () => {
      setTimeout(function () {
        msgSelect.components[0].setDisabled(true);
        messageSent.edit({
          content: `${client.config.emoji.wrong} ***Time Ended, type: \`/help\` again***`,
          embeds: [helpembed],
          components: [msgSelect],
        });
      }, 120000);
    });
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
