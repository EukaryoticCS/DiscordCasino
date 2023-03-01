const {SlashCommandBuilder} = require('discord.js');
const deckofcards = require('../services/deckofcards.js');

module.exports ={
	data: new SlashCommandBuilder().setName('blackjack').setDescription('Our main play blackjack command'),
	async execute(interaction, btnBlackjack){ 

		// interaction.deferReply();
        await deckofcards.startBlackJack();
		interaction.followUp({content: 'Welcome to Blackjack! Here are your cards: ' + deckofcards.getPlayerCards(), components: [btnBlackjack]});
	},
};