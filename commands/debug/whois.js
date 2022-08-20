const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
const moment = require(`moment`)
module.exports = {
	name: 'whois',
	aliases: ['ws'],
	category: 'Debug',
	description: 'Fetchs an user\'s info from discord.',
	usage: '<user/ID>',
	guildOnly: false,
	ownerOnly: true,
	cooldown: 5,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");
	var whoUser = message.mentions.users.first();
	if(!whoUser){
		if(!args[0]){
			const noUser = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor("RED")
			.setFooter(`Debug Module • ${client.user.username} ${config.version}`, client.user.displayAvatarURL())
			.setDescription(`❌ You need to mention a user (or ID).`);
			if(checkPerms){
				message.channel.send(noUser).then(msg => msg.delete({timeout:5000}));
				message.delete();
				return;
			}else{
				message.channel.send(noUser);
				return;
			};
		};
		try{
			var whoUser = await client.users.fetch(args[0]);
		}catch(e){
			const invalidUser = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor("RED")
			.setFooter(`Debug Module • ${client.user.username} ${config.version}`, client.user.displayAvatarURL())
			.setDescription(`❌ That user does not exist, please use a valid mention/ID.`);
			if(checkPerms){
				message.channel.send(invalidUser).then(msg => msg.delete({timeout:5000}));
				message.delete();
				return;
			}else{
				message.channel.send(invalidUser);
				return;
			};
		};
	};
	const userData = new Discord.MessageEmbed()
	.setTimestamp()
	.setColor(config.colors.default)
	.setFooter(`Debug Module • ${client.user.username} ${config.version}`, client.user.displayAvatarURL())
	.setAuthor(`${whoUser.username}\'s Information.`, whoUser.displayAvatarURL())
	.setThumbnail(whoUser.displayAvatarURL())
	.setDescription(`
		------------------------------------------------------------------

		** ⌇ 🎓 Name: ** ${whoUser.toString()}.

		** ⌇ ✉️ ID: ** ${whoUser.id}.

		** ⌇ ⏱️ Joined discord on: ** ${moment(whoUser.createdAt).format('LL LTS')}.

		------------------------------------------------------------------
	`);
	message.channel.send(userData);
	return;
	},
};
