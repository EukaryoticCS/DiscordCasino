//https://discordjs.guide/popular-topics/embeds.html#embed-preview
const { EmbedBuilder, Client, IntentsBitField} = require('discord.js');

const client = new Client({intents:[IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMessageReactions]})
//const channel = client.channels.fetch('1006328808917438546') 

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
    .setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL:'https://i.imgur.com/AfFp7pu.png'});

client.on('ready', client => {
	client.channels.get('1006328808917438546').send('Hello here!');
});
module.exports = exampleEmbed;
