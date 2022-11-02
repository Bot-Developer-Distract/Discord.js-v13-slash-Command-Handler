const client = require("../../index");
const { MessageEmbed, Collection } = require("discord.js");
const cooldowns = new Map();

client.on("interactionCreate", async (interaction) => {
  // ======================< Slash Command Handling >====================== \\
  if (!interaction.isCommand()) return;

  //await interaction.deferReply({ ephemeral: false }).catch(() => {});

  if (!client.commands.get(interaction.commandName)) return;
  interaction.selectedValue = interaction.options._hoistedOptions[0]
    ? interaction.options._hoistedOptions[0].value
    : undefined;
  const cmd = client.slashCommands.get(interaction.commandName);

  if (cmd.developer && interaction.user.id !== "928640467619434526") {
    return interaction.reply({
      content: `${client.config.emoji.wrong} *You cannot use this command!*`,
      ephemeral: true,
    });
  }

  if (cmd.admin && !interaction.member.permissions.has("ADMINISTRATOR")) {
    return interaction.reply({
      content: `${client.config.emoji.wrong} *You cannot use this command*`,
      ephemeral: true,
    });
  }

  if (
    cmd.staff &&
    !interaction.member.roles.cache.some((r) => r.name === "Giveaway Manager")
  ) {
    return interaction.reply({
      content: `${client.config.emoji.wrong} *You cannot use this command*`,
      ephemeral: true,
    });
  }

  cmd.run(client, interaction);

  if (!cooldowns.has(cmd.name)) {
    const coll = new Collection();
    cooldowns.set(cmd.name, coll);
  }
  const current_time = Date.now();
  const time_stamps = cooldowns.get(cmd.name);
  const cooldown_amount = cmd.cooldown * 1000;
  if (time_stamps.has(interaction.user.id)) {
    const expiration_time =
      time_stamps.get(interaction.user.id) + cooldown_amount;
    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;
      const embed = new MessageEmbed()
        .setColor(client.config.color.error)
        .setTitle(`${client.config.emoji.wrong} Too Fast!`)
        .setDescription(
          `**You are in a cooldown! Please wait \`${time_left.toFixed(
            1
          )}\` seconds, To Use the command, \`${cmd.name}\` Again**!`
        )
        .setFooter({
          text: `⌚ Cooldown System\n↳ Powered by Supreme Development`,
        });
      return interaction.reply({ embeds: [embed] });
    }
  }
  time_stamps.set(interaction.user.id, current_time);
  setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);
});

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
