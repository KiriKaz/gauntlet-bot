const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = settings.prefix;
const lv = settings.levels;
const pw = lv.passwords;
const role = lv.roles;
const room = lv.rooms;
const strpattern = /[^\s"']+|"([^"]*)"|'([^']*)'/g;

client.on('ready', () => {
  console.log(`IT LIVES (at ${new Date()})`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) { return; } // Caso a mensagem não é um comando, ignore. Provávelmente retiraremos isso para a senha funcionar direito.
  if (message.author.bot) { return; } // Compatibilidade com outros bots. Se algum bot disser !ping não fará nada
  console.log("A wild prefix has appeared!");

  sorted = message.content.match(strpattern);
  sorted[0] = sorted[0].toLowerCase().slice(1); //removes the prefix
  console.log(sorted);



  //note to self if (message.member.roles.has(lv.roles.dev))
  switch (sorted[0]){
    case "ping":
      console.log(`Ping sent at ${Date.now()}`);
      message.reply(`Pong! I'm at: \`${Date.now() - message.createdTimestamp}ms\``);
      break;
    case "unix":
      console.log(`Unix sent at ${Date.now()}`);
      message.channel.send(`Unix is: \`${Date.now()}\`!`);
      break;
    case "date":
      console.log(`Date sent at ${Date.now()}`);
      message.channel.send(`Current time and date is \`${new Date()}\`.`);
      break;
    case "password":
      if(!sorted[1]) {
        message.reply("You have to include the password!");
        return;
      }
      console.log("I see "+sorted[1]+" as the password. Everything else is ignored.")
      switch(sorted[1]) {
        case pw.l0l1:
          message.author.send(`You have passed to the next level.`);
          message.guild.channels.find("id", room.dev).send(`${message.author.username} just passed his level by sending \`${message.content}\`.`);
          message.delete();
          message.member.addRole(role.l1);
          message.member.removeRole(role.l0);
          break;
        default:
          message.reply("I'm sorry, but you got it wrong. Try again.");
          message.delete(); //remove this if you want but i prefer not doing this incase they get a typo off the answer and it makes it obvious
     }
  }
});

client.login(settings.token);
