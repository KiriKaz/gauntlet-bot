const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = settings.prefix;
const lv = settings.levels;
const pw = lv.passwords;
const role = lv.roles;
const room = lv.rooms;
const strpattern = /[^\s"']+|"([^"]*)"|'([^']*)'/g;

var guild;

function getPw(password,message) {
  if (message.channel.type != "dm") {
    message.reply('please send that command only on a direct message to me');
    message.delete();
  } else if (!password) {
    message.reply("You have to include the password!");
  } else if (!guild){
    message.reply("At the moment, I'm unable to process your request. Please, ask a staff member to set the bot up!");
  } else {
    console.log("Checking the password");
    console.log(guild.members);
  }
}

client.on('ready', () => {
  console.log(`IT LIVES (at ${new Date()})`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) { return; } // Caso a mensagem não é um comando, ignore.
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
    case "setup":
      if (message.member.roles.has(lv.roles.dev) && !guild){
        guild = message.guild
        message.channel.send(`Setup was completed`);
        
      }else if (message.member.roles.has(lv.roles.dev)) {
         message.channel.send(`Setup was already completed`);
      }
      console.log(guild.members);
      break;
    case "unix":
      console.log(`Unix sent at ${Date.now()}`);
      message.channel.send(`Unix is: \`${Date.now()}\`!`);
      break;
    case "date":
      console.log(`Date sent at ${Date.now()}`);
      message.channel.send(`Current time and date is \`${new Date()}\`.`);
      break;
    case "donate":
      console.log('Donate sent at ${Date.now()}');
      message.channel.send('Thanks for donating!\nBitcoin: http://imgur.com/DW8BZDc');
      break;
    case "opme":
      message.channel.send("Has anyone really been far even as decided to use even go want to do look more like?");
      break;
    case "password":
      console.log("I see "+sorted[1]+" as the password. Everything else is ignored.")
      getPw(sorted[1],message);
  }
});


// we should really work on fixing this. lol
// i know it's a security flaw and shit but i was too lazy to figure out how to do the whole damn gitignore thing
// i'll get to it though
client.login(settings.token);
