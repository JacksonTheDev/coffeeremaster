const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'reload',
	aliases: ['restart'],
	category: 'Debug',
	description: 'Reloads a command.',
	usage: '<command>',
	guildOnly: false,
	ownerOnly: true,
	cooldown: 5,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");
  if(!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
  const commandName = args[0].toLowerCase();
  const command = client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if(!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
  const commandFolders = fs.readdirSync('./commands');
  const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));
  delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];
  try{
    const newCommand = require(`../${folderName}/${command.name}.js`);
	  message.client.commands.set(newCommand.name, newCommand);
    message.channel.send(`Command \`${command.name}\` was reloaded!`);
  }catch(e){
	  console.log(error);
	  message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
  };
	},
};
