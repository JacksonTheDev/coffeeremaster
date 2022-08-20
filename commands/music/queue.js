const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'queue',
	aliases: ['q', 'songs'],
	category: 'Music',
	description: 'Shows the current server queue.',
	usage: false,
	guildOnly: true,
	ownerOnly: false,
	cooldown: 10,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");
	const emojiArrow = client.emojis.cache.find(emoji => emoji.id === "870492046740299798")
	const emojiMusic = client.emojis.cache.find(emoji => emoji.id === "870496495055540254")
	const onEmoji = client.emojis.cache.find(emoji => emoji.id === "954510120941928488");
	const offEmoji = client.emojis.cache.find(emoji => emoji.id === "954509663263654008");
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
	const queue = client.distube.getQueue(message);
	if(!queue){
		const noQueuePlaying = new Discord.MessageEmbed()
		.setDescription(`🎓 Actualmente no hay nada en reproducción. `)
		.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
		.setTimestamp();
		if(checkPerms){
			message.channel.send(noQueuePlaying).then(msg => msg.delete({timeout:5000}));
			message.delete();
			return;
		}else{
			message.channel.send(noQueuePlaying);
			return;
		};
	};
	const qArray = queue.songs.map((song, id) =>
		`**• ${emojiArrow} ${id + 1}**. \`${song.formattedDuration}\` - **${song.name}**
		• ☕ \` Pedida por: \` **[${song.user.toString()}]**
        ──────────────────────`
	).join("\n");
	const loopMode = {"0":offEmoji, "1":"🔂", "2":"🔁"};
	const currentQueueEmbed = new Discord.MessageEmbed()
	.setDescription(`
		**📒 Lista de reproduccion activa: 📒 **

        ──────────────────────
		${qArray}

		• ⏰ Tiempo restante: **[\`${queue.formattedDuration}\`]**‎      ‏‏‎‎      ‏‏‎‎            ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎      ‏‏‎‎  ‏‏‎• 🔊 Volume: **[\`${queue.volume}\`]**
		• ⏯️ Autoplay: **${queue.autoplay ? onEmoji:offEmoji}**‎      ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎      ‏‏‎‎  ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎       ‏‏‎‎  ‏‏‎‎           ‏‏‎‎  ‏‏‎  ‏‏‎‎      ‏‏‎‎    ‏‏‎‎           ‏‏‎‎     ‏‏‎‎      ‏‏‎‎    ‏‏‎‎  ‏‏‎‎      ‏‏‎‎      ‏‏‎‎        ‏‏‎‎      ‏‏‎‎      ‏‏‎‎  • ⏯️ Loop: **${loopMode[queue.repeatMode]}**
	`)
	.setColor(config.colors.default)
	.setThumbnail(client.user.displayAvatarURL())
	.setTimestamp()
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	message.channel.send(currentQueueEmbed);
	if(checkPerms){
		message.delete();
	};
	},
};
