const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const btnSlots = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
	.setCustomId('btnBet1')
	.setLabel('Bet  1')
	.setStyle(ButtonStyle.Success),
)
.addComponents(
	new ButtonBuilder()
	.setCustomId('btnBet10')
	.setLabel('Bet  10')
	.setStyle(ButtonStyle.Success),
)
.addComponents(
	new ButtonBuilder()
	.setCustomId('btnBet100')
	.setLabel('Bet  100')
	.setStyle(ButtonStyle.Success),
)
.addComponents(
	new ButtonBuilder()
	.setCustomId('btnSpin')
	.setLabel('Spin')
	.setStyle(ButtonStyle.Success),
);

module.exports ={btnSlots};