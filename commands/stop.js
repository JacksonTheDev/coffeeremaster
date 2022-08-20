const { EmbedBuilder, Embed } = require('discord.js');
module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)


    const goodbyembed = new EmbedBuilder()
    .setDescription(`
    
    Gracias por permitirme estar, me retiro, buenas noches.
    
    `)
    .setTimestamp()
    .setColor(0xff9e00)

    const cantskip = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 \`Disculpa, no estoy contectado actualmente.\`
  
    `)
    .setTimestamp()
    .setColor(0xff9e00)
    if (!queue) return message.channel.send({embeds:[cantskip]})

    queue.stop()
    message.channel.send({embeds:[goodbyembed]})
    client.distube.voices.leave(message)
  }
}
