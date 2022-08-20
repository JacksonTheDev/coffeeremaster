const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'roll',
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

    message.delete()
    let limit = args[0];
    if (!limit) limit = 6;
    const n = Math.floor(Math.random() * limit + 1);
    const embed = new Discord.MessageEmbed()
      .setTitle('🎲  Gira el dado. ')
      .setDescription(`${message.member}, te ha salido **${n}**!`)
	  .setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	  .setColor(config.colors.default)
	  .setTimestamp();
    message.channel.send(embed);



	},
};
