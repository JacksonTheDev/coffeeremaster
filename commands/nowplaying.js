const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)

    const cantskip = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 \`Disculpa, no hay ninguna cancion actualmente.\`
  
    `)
    .setTimestamp()
    .setColor(0xff9e00)
    if (!queue) return message.channel.send({embeds:[cantskip]})

    let currentsongembed = new EmbedBuilder()
    .setDescription(`
    

   \`La canción actual es: ${song.name} (${song.user})\`
    
    `)
    .setTimestamp()
    .setColor(0xff9e00)
    .setImage(song.thumbnail);



    const song = queue.songs[0]
    message.channel.send({embeds:[currentsongembed]})
  }
}
