const { EmbedBuilder } = require("discord.js")
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message, member) => {
    const queue = client.distube.getQueue(message)

    const noperms = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 Disculpe, solamente miembros MVP pueden realizar esta accion.
    
    `)
    .setTimestamp()
    .setColor(0xff9e00)

    const permission = message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)

    if (!permission) return message.channel.send({embeds:[noperms]})
    

    const cantskip = new EmbedBuilder()
    .setDescription(`
    
    • 🍋 \`Disculpa, no hay ninguna cancion actualmente.\`
  
    `)
    .setTimestamp()
    .setColor(0xff9e00)
    if (!queue) return message.channel.send({embeds:[cantskip]})
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`• 🍋 Modo autoplay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}
