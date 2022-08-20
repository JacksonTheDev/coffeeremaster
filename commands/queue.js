const { EmbedBuilder } = require("discord.js")
const { PermissionsBitField } = require('discord.js');
module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    const q = queue.songs.map((song, i) => `
    **• 📒 ${i === 0 ? 'Playing:' : `${i + 1}.`} \`${song.formattedDuration}\` - **${song.name}**
		• ☕ \` Pedida por: \` [${song.user.toString()}]
    ──────────────────────`
	).join("\n");

  const queueembed = new EmbedBuilder()

  .setDescription(`

  \n${q}
  
  `)
  .setTimestamp()
  .setColor(0xff9e00)
  .setThumbnail('https://cdn.discordapp.com/attachments/1010587272946659418/1010680553315516416/firma.png')

  message.channel.send({embeds:[queueembed]})


  }
}
