const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'repeat',
	aliases: ['r'],
	category: 'Music',
	description: 'Toggles repeat mode for a queue.',
	usage: '<off/one/all>',
	guildOnly: true,
	ownerOnly: false,
	cooldown: 5,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");
	if(!message.member.voice.channel){
		const noVoice = new Discord.MessageEmbed()
		.setDescription(`🎓 Debés estar dentro de un canal de voz para usar esto. `)
		.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	    .setColor(config.colors.default)
		.setTimestamp();
		if(checkPerms){
			message.channel.send(noVoice).then(msg => msg.delete({timeout:5000}));
			message.delete();
			return;
		}else{
			message.channel.send(noVoice);
			return;
		};
	};
	if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel){
		const wrongVoice = new Discord.MessageEmbed()
		.setDescription(`🎓 Debés estar en el mismo canal de voz que el bot para usar este comando. `)
		.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	    .setColor(config.colors.default)
		.setTimestamp();
		if(checkPerms){
			message.channel.send(wrongVoice).then(msg => msg.delete({timeout:5000}));
			message.delete();
			return;
		}else{
			message.channel.send(wrongVoice);
			return;
		};
	};
	if(!args[0]){
		const noMode = new Discord.MessageEmbed()
		.setDescription(`🎓 Selecciona un modo para el repetir, use off/one/all.`)
		.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	    .setColor(config.colors.default)
		.setTimestamp();
		if(checkPerms){
			message.channel.send(noMode).then(msg => msg.delete({timeout:5000}));
			message.delete();
			return;
		}else{
			message.channel.send(noMode);
			return;
		};
	};
  const modes = {"off":"0", "one":"1", "all":"2"};
  const emojis = {"off":"🚫", "one":"🔂", "all":"🔁"};
  const descriptions = {"off":"Toggled repeat mode off", "one":"Toggled repeat mode to current song", "all":"Toggled repeat mode to entire queue"};
  const repeatMode = modes[args[0].toLowerCase()];
  const repeatEmoji = emojis[args[0].toLowerCase()];
  const repeatDesc = descriptions[args[0].toLowerCase()];
  if(!repeatMode){
    const invalidMode = new Discord.MessageEmbed()
	.setDescription(`🎓 Selecciona un modo para el repetir, use off/one/all.`)
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	.setColor(config.colors.default)
    .setTimestamp();
    if(checkPerms){
			message.channel.send(invalidMode).then(msg => msg.delete({timeout:5000}));
			message.delete();
			return;
		}else{
			message.channel.send(invalidMode);
			return;
		};
  };
  const modeChanged = new Discord.MessageEmbed()
  .setTimestamp()
  .setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
  .setColor(config.colors.default)
  .setDescription(`📢 ${repeatDesc} ${repeatEmoji}`);
  client.distube.setRepeatMode(message, args[0]);
  if(checkPerms){
    message.channel.send(modeChanged).then(msg => msg.delete({timeout:15000}));
    message.delete();
    return;
  }else{
    message.channel.send(modeChanged);
    return;
  };
	},
};
