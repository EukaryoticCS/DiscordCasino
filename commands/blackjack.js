const {SlashCommandBuilder} = require('discord.js');

module.exports ={
	data: new SlashCommandBuilder().setName('blackjack').setDescription('Our main play blackjack command'),
	 async execute(interaction){ 
		return interaction.reply('this is blackjack!');
	},
};