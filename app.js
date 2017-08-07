const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = require('./settings.json').prefix;

client.on('ready', () => {
  console.log("IT'S ALIVE\nIT'S ALIIIIIIVE");
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) { return; } // Caso a mensagem não é um comando, ignore. Provávelmente retiraremos isso para a senha funcionar direito.
  if (message.author.bot) { return; } // Compatibilidade com outros bots. Se algum bot disser !ping não fará nada
  console.log("Mensagem com prefix vista!");

  var lowerMessage = message.content;
  var lowerMessage = lowerMessage.toLowerCase();

  // probably want to rewrite this switch statement it's kind of hard to make arguments in commands using a switch statement
  // but if you don't want to do args in commands keep using this because it's far better code than using the clunky if statements
  switch (lowerMessage){
    case prefix + "ping":
      console.log(`Ping sent at ${Date.now()}`);
      message.reply("pong!");
      break;
    case prefix + "unix":
      console.log(`Unix sent at ${Date.now()}`);
      message.channel.send(`Ponged: \`${Date.now()}\`ms!`);
      break;
    case prefix + "date":
      console.log(`Date sent at ${Date.now()}`);
      message.channel.send(`Current time and date is \`${new Date()}\`.`);
      break;
    case prefix + "prefix":
      console.log(`Prefix sent at ${Date.now()}`);
      message.channel.send(`Current prefix is \`${prefix}\``);
  }

});

client.login(settings.token);
