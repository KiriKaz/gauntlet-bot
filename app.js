const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = settings.prefix;
const lv = settings.levels;
const pw = lv.passwords;
const role = lv.roles;
const room = lv.rooms;
const strpattern = /[^\s"']+|"([^"]*)"|'([^']*)'/g;

function getPw(password,message) {
  for (var key in pw) {
    
    if (pw.hasOwnProperty(key)) {
        
      if (password == pw[key] && message.member.roles.has(lv.roles[key.substring(0,2)])) {
        
        console.log(key + " --> " + pw[key]);
        
        message.author.send(`You have passed to the next level.`);
        message.guild.channels.find("id", room.dev).send(`${message.author.username} just passed from level ${key.substring(1,2)} to ${key.substring(3,4)} level by sending \`${message.content}\`.`);
        console.log(`${message.author.username} just passed from level ${key.substring(1,2)} to ${key.substring(3,4)} level by sending \`${message.content}\`.`)
        message.delete();
        message.member.addRole(lv.roles[key.substring(2,4)]);
        message.member.removeRole(lv.roles[key.substring(0,2)]);
      } else {
        message.author.send(`\`${password}\` is wrong, please try again`);
        message.delete();
      }
    }
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
    case "password":

      if(!sorted[1]) {
        message.reply("You have to include the password!");
        return;
      }
      console.log("I see "+sorted[1]+" as the password. Everything else is ignored.")
      getPw(sorted[1],message);
  }
});

client.login(settings.token);
