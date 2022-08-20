const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
const { profile } = require('console');
module.exports = {
	name: 'avatar',
	aliases: ['icon', 'picture', 'image'],
	category: 'Utility',
	description: 'Shows an user\'s icon.',
	usage: '[user/id]',
	guildOnly: false,
	ownerOnly: false,
	cooldown: 5,
	execute: async (message, args) => {
	const client = message.client;
	const checkPerms = message.guild.me.hasPermission("MANAGE_MESSAGES") || message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES");
	var user = message.mentions.users.first();
  if(!user){
    if(!args[0]){
      var user = message.author;
    }else{
      try{
        var user = await client.users.fetch(args[0]);
      }catch(e){
        const invalidInput = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`
        	❌ Ese usuario no existe, intenta mencionar a alguien.
        `);
        message.channel.send(invalidInput).then(msg => msg.delete({timeout:10000}));
        if(checkPerms){
          message.delete();
        };
        return;
      };
    };
  };
  const userAvatar = new Discord.MessageEmbed()
  .setImage(user.displayAvatarURL({format:"png", dynamic:true, size:2048}))
  .setColor(config.colors.default)
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
  .setDescription(`
  	[**${user.username}\'s Avatar**](${user.displayAvatarURL({format:"png", dynamic:true, size:2048})})
  `);
  message.channel.send(userAvatar);
  return;
	},
};
