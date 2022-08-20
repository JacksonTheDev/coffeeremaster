const fs = require('fs');
const ms = require('ms')
const Discord = require('discord.js');
const mongoCurrency = require('discord-mongo-currency');
const DisTube = require('distube');
const config = require('./config.json');
const Levels = require('discord-xp')
let mongo = require('mongodb')
const { Database } = require('zapmongo');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for(const folder of commandFolders){
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for(const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	};
};

Levels.setURL("mongodb+srv://Thomas:Catalina31205505@cluster0.zyneu.mongodb.net/WarningsDB?retryWrites=true&w=majority&ssl=true")

mongoCurrency.connect("mongodb+srv://Thomas:Catalina31205505@cluster0.zyneu.mongodb.net/WarningsDB?retryWrites=true&w=majority&ssl=true")


client.distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: false});
client.distube.on("playSong", async (message, queue, song) => {
  const currentlyPlaying = new Discord.MessageEmbed()
  .setTitle(`☕ Que comience la musica. `)
  .setDescription(`

  • 🍋 \`Ahora suena:\`
  [${song.name}]

  • 🌻 \`Duración:\`
  [${song.formattedDuration}]

  • 📒 \` Pedida por: \`
  [${song.user}]

  `)
  .setTimestamp()
	.setColor(config.colors.default)
	.setThumbnail(song.thumbnail)
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
	message.channel.send(currentlyPlaying).then(msg => msg.delete({timeout:20000}));
	return;
});
client.distube.on("addSong", async (message, queue, song) => {
	const nextPlaying = new Discord.MessageEmbed()
	.setTitle(`☕ Agregada a la lista.`)
	.setDescription(`

	    • 🍋 \` Canción:: \`
		**[${song.name}]**

		• 📒 \` Pedida por: \`
		[${song.user}]

	`)
	.setTimestamp()
	.setThumbnail(song.thumbnail)
	.setColor(config.colors.default)
	.setFooter(`• コーヒーと平和 | Jack  `, client.user.displayAvatarURL())
  message.channel.send(nextPlaying).then(msg => msg.delete({timeout:20000}));
	return;
});

const cooldowns = new Discord.Collection();


client.once("ready", async (member) => {
    setInterval(async ()=>{
        let textList = ['', '']
        var text = textList[Math.floor(Math.random() * textList.length)];
        client.user.setActivity(text , { type: 'WATCHING' })
    },60000) // milliseconds
});






client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
	

	client.db = new Database( {

		mongoURI: config.mongoURI,
		schemas: [
			{
				name: 'test',
				data: {
					hello: String
				}
		
			}
		]
		
		});


(async () => {

		const data = await client.db.load('test');
		await data.create({hello: "world"})
	   
	   })
	   

client.on("message", async (message) => {


	const prefix = config.prefix;


    let blacklisted = ['loli', 'shota'];
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
	  
    }
	if (foundInText) {
		if(message.member.hasPermission("MANAGE_MESSAGES")) return

		let automodlogschannel = client.channels.cache.get("828402791398899712")

		let forbidenword = new Discord.MessageEmbed()
		.setDescription(`
		
	   ${message.author} is talking about a forbiden topic
  
	   Channel: ${message.channel}

	   Message: ${message.content}
	   
		`)
		.setColor(0xff7700)
		.setFooter(`Auto-Mod logs • ${client.user.username} ${config.version}`)
		
  
		  return automodlogschannel.send(forbidenword)
	}

	let automutetext = ['nigger', 'nigga', 'niggor', 'dago', 'negro', 'nigg3rs', 'nibba'];
    let foundInTextBan = false;
    for (var i in automutetext) {
      if (message.content.toLowerCase().includes(automutetext[i].toLowerCase())) foundInTextBan = true;
	  
    }
	if (foundInTextBan) {
	if(message.member.hasPermission("MANAGE_MESSAGES")) return
	let time = "10s"

	let mutedembed = new Discord.MessageEmbed()
	.setDescription(`
	
	${message.member.displayName} you have been tempmuted.
    Mute duration: ${time}

	Reason: Forbidden word.
	
	`)
	.setColor(0xff7600)
	.setThumbnail("https://cdn.discordapp.com/attachments/827189683679264788/827239633774837780/353280ccbe4f9020183dbaeefc3a2735.png")
	.setTimestamp()

	message.channel.send(mutedembed).then(msg => msg.delete({timeout:15000}));

		message.delete()
		let automodlogschannel = client.channels.cache.get("828402791398899712")
		const role = message.guild.roles.cache.find(role => role.name === 'Muted')

		let forbidenword = new Discord.MessageEmbed()
		.setDescription(`
		
		🚹 • ${message.author} has been automuted.

		📰 • Reason: The user has said a forbidden word.
  
		📋 • Channel: ${message.channel}

		💬 • Message content: ${message.content}
	   
		`)
		.setColor(0xff7700)
		.setThumbnail("https://cdn.discordapp.com/attachments/828439823190720583/829689455853305887/3384985.png")
		.setFooter(`Auto-Mod logs • ${client.user.username} ${config.version}`, client.user.displayAvatarURL())

		await message.member.roles.add(role)
		automodlogschannel.send(forbidenword)
  
	automodlogschannel.send(forbidenword)
		  setTimeout(async () => {
			const role2 = message.guild.roles.cache.find(role => role.name === 'Muted')
			await message.member.roles.remove(role2)
			let logsunmuteauto = client.channels.cache.get("828402791398899712")
			let logunmute = new Discord.MessageEmbed()
			.setTitle(` ** Member has been automaticaly unmuted **`)
			.setDescription(`
			
			🚹 • User unmuted: ${message.author}
		
			🕐 • Time: ${new Intl.DateTimeFormat("en-US").format(Date.now())}
		
			
			`)
			.setFooter(`Auto-Mod logs • ${client.user.username} ${config.version}`, client.user.displayAvatarURL())
			.setThumbnail("https://cdn.discordapp.com/attachments/828439823190720583/829689600892731412/unnamed.png")
			.setColor("GREEN")
		
			logsunmuteauto.send(logunmute)
			
		}, ms(time))
	}


	let scamlink = ['steamcommunytu.ru', 'steamcommunytu.ru/tradeoffer', 'https://stearncomminuty.ru', '/trade/?partner=382733&token=293882']
	let foundScamLink = false;
	for(var i in scamlink) {

		if (message.content.toLowerCase().includes(scamlink[i].toLowerCase())) foundScamLink = true;

	}
	if(foundScamLink) {
    message.delete()	
   let bellemoji = message.guild.emojis.cache.find(emoji => emoji.name === "AnimatedBell")

   let mutedrole = message.guild.roles.cache.find(role => role.name === "Muted")
   
   let ScamLinkEmbed = new Discord.MessageEmbed()
   .setDescription(`
   
   \`\You have been permanently muted for suspicious activity.\`\

   Reason: **Fishy link/Scam Link** ${bellemoji}

   *If you think this is an error, contact an administrator.*
   
   `)
   .setColor("RED")
   .setColor(config.colors.default)
   .setFooter(`• Zachary • | !help  `, client.user.displayAvatarURL())
   .setTimestamp()

   message.channel.send(`${message.author}`, ScamLinkEmbed)
   await message.member.roles.add(mutedrole)

	}

	if(!message.content.startsWith(prefix) || message.author.bot) return;

	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command) return;
	if(command.guildOnly && message.channel.type === 'dm'){
		return message.reply('I can\'t execute that command inside DMs!');
	};
	if(command.ownerOnly && !config.staffIDS.includes(message.author.id)) return;
	if(!cooldowns.has(command.name)){
		cooldowns.set(command.name, new Discord.Collection());
	};
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 5) * 1000;
	if(timestamps.has(message.author.id)){
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if(now < expirationTime){
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		};
	};
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try{
		command.execute(message, args);
	}catch(e){
		console.log(e);
		message.reply("Error.");
	};
});

client.login(config.token);
