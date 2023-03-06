const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const btnBlackjack = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('btnHit')
    .setLabel('Hit')
    .setStyle(ButtonStyle.Primary)
    .setDisabled(false)
)
.addComponents(
    new ButtonBuilder()
    .setCustomId('btnBet1')
    .setLabel('Bet 1')
    .setStyle(ButtonStyle.Success)
    .setDisabled(false)
)
.addComponents(
    new ButtonBuilder()
    .setCustomId('btnBet10')
    .setLabel('Bet 10')
    .setStyle(ButtonStyle.Success)
    .setDisabled(false)
)
.addComponents(
    new ButtonBuilder()
    .setCustomId('btnBet100')
    .setLabel('Bet 100')
    .setStyle(ButtonStyle.Success)
    .setDisabled(false)
)
.addComponents(
    new ButtonBuilder()
    .setCustomId('btnStand')
    .setLabel('Stand')
    .setStyle(ButtonStyle.Danger)
    .setDisabled(false)
);
module.exports = { btnBlackjack };