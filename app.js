const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready', () => {
  console.log("IT'S ALIVE\nIT'S ALIIIIIIVE");
});

var prefix = "!";
client.on('message', message => {
  var lowerMessage = message.content;
  var lowerMessage = lowerMessage.toLowerCase();
  if (lowerMessage === prefix + "ping") {
    message.reply("pong!");
  }
});

client.login(settings.token);
