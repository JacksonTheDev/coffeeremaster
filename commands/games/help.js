const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'ayuda',
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
    const embed = new Discord.MessageEmbed()
      .setTitle('🌙  Ayuda de comandos de musica. ')
      .setDescription(`
      
      
      • 🍋 \`Reproducir musica:\`
      
      **+play** (Link / Nombre)
      **+stop** (Detiene la musica actual.)
      **+skip** (Salta a la siguiente musica)
      **+queue** (Ver la lista actual de canciónes.)
      
      `)
	  .setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	  .setColor(config.colors.default)
	  .setTimestamp();
    message.channel.send(embed);



	},
};
