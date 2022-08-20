const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message, song) => {
    const queue = client.distube.getQueue(message)



    const pausedSong = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 \`Playlist pausada, para resumir utiliza +resume\`
  
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
      return message.channel.send('Resumed the song for you :)')
    }
    queue.pause()
    message.channel.send({embeds:[pausedSong]})
  }
}
