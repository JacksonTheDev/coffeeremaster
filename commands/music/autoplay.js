const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'autoplay',
	aliases: ['auto'],
	category: 'Music',
	description: 'Toggles autoplaying for a queue.',
	usage: false,
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
	if(!message.guild.me.voice.channel){
		const noQueue = new Discord.MessageEmbed()
		.setDescription(`🎓 No hay una lista activa.`)
		.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
		.setColor(config.colors.default)
		.setTimestamp();
		if(checkPerms){
			message.channel.send(noQueue).then(msg => msg.delete({timeout:5000}));
			message.delete();
			return;
		}else{
			message.channel.send(noQueue);
			return;
		};
	};
  const autoplayMode = client.distube.toggleAutoplay(message);
  if(autoplayMode){
    var mode = "On";
    var color = "GREEN";
  }else{
    var mode = "Off";
    var color = "RED";
  };
  const autoplayEmbed = new Discord.MessageEmbed()
  .setDescription(`
    ⏯️ Toggled autoplaying ${mode}!
  `)
  .setFooter(`Music Module • ${client.user.username} ${config.version}`, config.icons.musicIcon)
  .setColor(color)
  .setTimestamp();
  if(checkPerms){
    message.channel.send(autoplayEmbed).then(msg => msg.delete({timeout:8000}));
    message.delete();
    return;
  }else{
    message.channel.send(autoplayEmbed);
    return;
  };
	},
};
