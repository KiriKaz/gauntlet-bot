const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready'.() => {
  console.log("IT'S ALIVE\nIT'S ALIIIIIIVE");
});

client.on('message'.message => {
  if (message.content === "ping") {
    message.reply("pong!");
  }
});

client.login(settings.token);
