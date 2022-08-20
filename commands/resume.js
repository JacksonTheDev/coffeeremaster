const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message, song) => {
    const queue = client.distube.getQueue(message)

    const resumeSong = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 \`Playlist resumida, disfruten!\`
  
    `)
    .setTimestamp()
    .setColor(0xff9e00)
    .setImage(song.thumbnail);

    const cantskip = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 \`Disculpa, no hay ninguna cancion actualmente.\`
  
    `)
    .setTimestamp()
    .setColor(0xff9e00)
    if (!queue) return message.channel.send({embeds:[cantskip]})
    if (queue.paused) {
      queue.resume()
      message.channel.send({embeds:[resumeSong]})
    } else {
      message.channel.send('The queue is not paused!')
    }
  }
}
