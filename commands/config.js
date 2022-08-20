const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'config',
    run: async (client, message, queue) => {

        const configembed = new EmbedBuilder()

        .setDescription(`

        **Configuracion actual del bot:**
        
        • 🍋 Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Toda la playlist' : 'Esta cancion') : 'Off'}\`
        
        • 🍋 Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\`
        
        `)
        .setTimestamp()
        .setColor(0xff9e00)
        .setThumbnail('https://media.discordapp.net/attachments/1010014646633255002/1010027042819031131/firma.png')

        message.channel.send({embeds:[configembed]})

    }
  }
  