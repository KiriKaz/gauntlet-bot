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

  var lowerMessage = message.content; // may be redundant
  var lowerMessage = lowerMessage.toLowerCase();
  var command = lowerMessage.slice(1); // removes prefix since we already know it's there

  // write code to support arguments using string split into an array & check amount of arguments so it works
  // index 0 will be command, if command expects argument(s) check other indexes

  // probably want to rewrite this switch statement it's kind of hard to make arguments in commands using a switch statement
  // but if you don't want to do args in commands keep using this because it's far better code than using the clunky if statements
  switch (command){
    case "ping":
      console.log(`Ping sent at ${Date.now()}`);
      message.reply(`Pong! I'm at: \`${Date.now() - message.createdTimestamp}ms\``);
      break;
    case "unix":
      console.log(`Unix sent at ${Date.now()}`);
      message.channel.send(`Ponged: \`${Date.now()}\`ms!`);
      break;
    case "date":
      console.log(`Date sent at ${Date.now()}`);
      message.channel.send(`Current time and date is \`${new Date()}\`.`);
  }
});

client.login(settings.token);
