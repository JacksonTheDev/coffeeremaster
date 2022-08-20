const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
  name: '8ball',
  execute: async (message, args, cont) => {
	const client = message.client;
	message.delete()
	let Pregunta = new Discord.MessageEmbed()
	.setDescription(`
	Please, make a longer question!
	`)
    .setColor(0x0091ff)
    if(!args[1]) return message.reply(Pregunta).then(msg => msg.delete(10000))
    let replies = [
        'Puede ser.. 👀',
	    'No lo creo.',
	    'Esperemos que si! 😉',
	    'Tal vez.. soñar no cuesta nada! ✨',
		'Hay una alta posibilidad.',
    	'Nunca!',
    	'Todo el mundo desea que eso suceda.',
		'Suena increible, sucedara',
		'No 😞',
    	'Pregunta mas tarde.',
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");
	var user = message.author;

    let embed = new Discord.MessageEmbed()
    .setDescription(`
    
    \`🎓 Pregunta de\` ${user}
	
	**${question}**

    \`📒 Respuesta:\`: **${replies[result]}**
    
    `)
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	.setColor(config.colors.default);
    message.channel.send({embed});
}
  }