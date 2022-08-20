const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message, song) => {
    const queue = client.distube.getQueue(message)

    const skipSong = new EmbedBuilder()
    .setTitle(`Canción omitida, saltando a la siguiente.`)
    .setDescription(`
    
    • 🍋 \`Ahora suena:\`
    [${song.name}]
  
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
    try {
      const song = await queue.skip()
      message.channel.send({embeds:[skipSong]})
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
