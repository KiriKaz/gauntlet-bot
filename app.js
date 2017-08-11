const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = settings.prefix;
const lv = settings.levels;
const pw = lv.passwords;
const role = lv.roles;
const room = lv.rooms;
const embed = settings.embeds;
const strpattern = /[^\s"']+|"([^"]*)"|'([^']*)'/g;

function getPw(password,message) {
  for (var key in pw) {
    
    if (pw.hasOwnProperty(key)) {
        
      if (password == pw[key] && message.member.roles.has(role[key.substring(0,2)]) && message.channel.id == room[key.substring(0,2)]) {
        
        console.log(key + " --> " + pw[key]);
        
        message.author.send(`You have passed to the next level.`);
        message.guild.channels.find("id", room.dev).send(`${message.author.username} just passed from level ${key.substring(1,2)} to ${key.substring(3,4)} level by sending \`${message.content}\`.`);
        console.log(`${message.author.username} just passed from level ${key.substring(1,2)} to ${key.substring(3,4)} level by sending \`${message.content}\`.`)
        message.member.addRole(role[key.substring(2,4)]);
        message.member.removeRole(role[key.substring(0,2)]);
        message.delete();
        return;
      } else if(message.channel.id == room[key.substring(0,2)]){
        message.author.send(`\`${password}\` is wrong, please try again`);
        message.delete();
        return;
      }
    }
  }
  message.delete();
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
  
  //note to self if (message.member.roles.has(role.dev))
  switch (sorted[0]){
    case "ping":
      console.log(`Ping received at ${Date.now()}`);
      message.reply(`Pong! I'm at: \`${Date.now() - message.createdTimestamp}ms\``);
      break;
    case "unix":
      console.log(`Unix received at ${Date.now()}`);
      message.channel.send(`Unix is: \`${Date.now()}\`!`);
      break;
    case "date":
      console.log(`Date received at ${Date.now()}`);
      message.channel.send(`Current time and date is \`${new Date()}\`.`);
      break;
    case "donate":
      console.log('Donate received at ${Date.now()}');
      message.channel.send('Thanks for donating!\nBitcoin: http://imgur.com/DW8BZDc');
      break;
    case "password":
      console.log(`Password received at ${Date.now()}`);
      if(!sorted[1]) {
        message.reply("You have to include the password!");
        return;
      }
      console.log("I see "+sorted[1]+" as the password. Everything else is ignored.")
      getPw(sorted[1],message);
      break;
    case "level":
      console.log(`Level received at ${Date.now()}`);
      if(embed[message.channel.id] != undefined) {
        message.channel.send(embed[message.channel.id]);
      }
    }
});

client.login(settings.token);
