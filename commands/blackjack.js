const {SlashCommandBuilder} = require('discord.js');
const deckofcards = require('../services/deckofcards.js');

module.exports ={
	data: new SlashCommandBuilder().setName('blackjack').setDescription('Our main play blackjack command'),
	async execute(interaction, btnBlackjack){ 

		// interaction.deferReply();
        await deckofcards.startBlackJack();
		interaction.followUp({content: 'this is blackjack!', components: [btnBlackjack]});
	},
};