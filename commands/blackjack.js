const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require('discord.js');

module.exports ={
	data: new SlashCommandBuilder().setName('blackjack').setDescription('Our main play blackjack command'),
	 async execute(interaction){ 
		const btnBlackjack = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnHit')
			.setLabel('Hit')
			.setStyle(ButtonStyle.Primary),
		)
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnBet')
			.setLabel('Bet')
			.setStyle(ButtonStyle.Success),
		)
		.addComponents(
			new ButtonBuilder()
			.setCustomId('btnStand')
			.setLabel('Stand')
			.setStyle(ButtonStyle.Danger),
		)
		
		interaction.reply({content: 'this is blackjack!', components: [btnBlackjack]});
	},
};