const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const deckofcards = require('../services/deckofcards.js');

module.exports ={
	data: new SlashCommandBuilder().setName('blackjack').setDescription('Our main play blackjack command'),
	async execute(interaction){ 

        interaction.deferReply();
        await deckofcards.startBlackJack();
		const btnBlackjack = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnHit')
			.setLabel('Hit')
			.setStyle(ButtonStyle.Primary),
		)
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnBJBet1')
			.setLabel('Bet 1')
			.setStyle(ButtonStyle.Success),
		)
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnBJBet10')
			.setLabel('Bet 10')
			.setStyle(ButtonStyle.Success),
		)
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnBJBet100')
			.setLabel('Bet 100')
			.setStyle(ButtonStyle.Success),
		)
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnStand')
			.setLabel('Stand')
			.setStyle(ButtonStyle.Danger),
		)
		
		interaction.followUp({content: 'this is blackjack!', components: [btnBlackjack], ephemeral:true});
        
	},
};