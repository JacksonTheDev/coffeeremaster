const fs = require('fs');
const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');
module.exports = {
	name: 'userinfo',
	aliases: ['ui'],
	category: 'Utility',
	description: 'Shows the info profile for a user.',
	usage: '[user]',
	guildOnly: true,
	ownerOnly: false,
	cooldown: 5,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");
	const userdata = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const devBadge = client.emojis.cache.find(emoji => emoji.id === "813622602009411624");
  const brilianceBadge = client.emojis.cache.find(emoji => emoji.name === "813624921207996427");
  const balanceBadge = client.emojis.cache.find(emoji => emoji.id === "813624730744651795");
  const braveryBadge = client.emojis.cache.find(emoji => emoji.name === "813624730636517426");
	const flags = {
		VERIFIED_DEVELOPER:`${devBadge}`,
		HOUSE_BRILLIANCE:`${brilianceBadge}`,
		HOUSE_BALANCE:`${balanceBadge}`,
		HOUSE_BRAVERY:`${braveryBadge}`
	};
	const roles = userdata.roles.cache
	.sort((a, b) => b.position - a.position)
	.map(role => role.toString())
	.slice(0, -1);
	const userFlags = userdata.user.flags.toArray();
	const avatar = userdata.user.displayAvatarURL();
	const userEmbed = new Discord.MessageEmbed()
	.setDescription(`
		**${userdata.user.username}\'s Profile:**

		──────────────────────
		
		** ⌇ 🎓 Name: ** ${userdata.user.username}

		** ⌇ ✉️ ID: ** ${userdata.user.id}

		** ⌇ 📦 TAG: ** <@${userdata.user.tag}>

		** ⌇ ❔ Status: ** ${userdata.user.presence.status}

		──────────────────────

		** ⌇ ⏱️ Joined discord on: ** ${moment(userdata.user.createdAt).format('LL LTS')}

		** ⌇ ⏱️ Joined this server on: ** ${moment(userdata.joinedAt).format('LL LTS')}

		** ⌇ 📜 Highest role on the server: ** ${userdata.roles.highest.id === message.guild.id ? 'N/A' : userdata.roles.highest.name}

		** ⌇ 🎛️ Roles:** [${roles.length}]: ${roles.length < 10 ? roles.join(', ') : roles.length >= 10 ? this.client.utils.trimArray(roles) : 'N/A'}

		──────────────────────

	`)
	.setThumbnail(avatar)
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	.setColor(config.colors.default);
	if(checkPerms){
		message.delete();
		message.channel.send(userEmbed).then(msg => msg.delete({timeout:15000}));
		return;
	}else{
		message.channel.send(userEmbed);
		return;
	};
  },
};
