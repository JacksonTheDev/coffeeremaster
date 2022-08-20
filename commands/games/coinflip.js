const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'coinflip',
	aliases: [''],
	category: '',
	description: '',
	usage: '',
	guildOnly: false,
	ownerOnly: false,
	cooldown: 5,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");

    const n = Math.floor(Math.random() * 2);

    var CoinEmoji = client.emojis.cache.get(`827194612350844998`)

    let result;
    if (n === 1) result = 'cara';
    else result = 'cruz';
    const embed = new Discord.MessageEmbed()
      .setTitle(`Coinflip`)
      .setDescription(`He girado una moneda para ti, ${message.member}. El resultado fue: **${result}**!`)
      .setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
      .setColor(config.colors.default)
      .setTimestamp()
    message.channel.send(embed);
  


	},
};
