const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = settings.prefix;
const lv = settings.levels; // unused for now

client.on('ready', () => {
  console.log(`IT LIVES (at ${new Date()})`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) { return; } // Caso a mensagem não é um comando, ignore. Provávelmente retiraremos isso para a senha funcionar direito.
  if (message.author.bot) { return; } // Compatibilidade com outros bots. Se algum bot disser !ping não fará nada
  console.log("Mensagem com prefix vista!");

  var command = message.content.slice(1); // removes prefix since we already know it's there
  var args = command.split(" "); // splits the command in  array of arguments
  args[0]=args[0].toLowerCase();

  // probably want to rewrite this switch statement it's kind of hard to make arguments in commands using a switch statement
  // but if you don't want to do args in commands keep using this because it's far better code than using the clunky if statements

  //note to self if (message.member.roles.has(lv.roles.dev))
  switch (args[0]){
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
      if(args[1]=lv.passwords.l0l1) {
        message.author.send(`You have passed to the next level.`);
        message.guild.channels.find("id", lv.rooms.dev).send(`${message.author.username} just passed his level by sending \`${message.content}\`.`);
        message.delete();
        message.member.addRole(lv.roles.l1);
        message.member.removeRole(lv.roles.l0);
        break;
     } else { break; }
  }
});

client.login(settings.token);
