const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('slots').setDescription('Brings up the slots'),
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
			.setCustomId('btnSLBet1')
			.setLabel('Bet  1')
			.setStyle(ButtonStyle.Success),
		)
        .addComponents(
			new ButtonBuilder()
			.setCustomId('btnSLBet10')
			.setLabel('Bet  10')
			.setStyle(ButtonStyle.Success),
		)
        .addComponents(
			new ButtonBuilder()
			.setCustomId('btnSLBet100')
			.setLabel('Bet  100')
			.setStyle(ButtonStyle.Success),
		)
        .addComponents(
            new ButtonBuilder()
            .setCustomId('btnSpin')
            .setLabel('Spin')
            .setStyle(ButtonStyle.Success),
        )
		interaction.followUp({content: 'slots! :grapes: :cherries: :peach:', components: [btnBlackjack], ephemeral: true});
	},
}
