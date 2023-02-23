const {SlashCommandBuilder} = require('discord.js');
const deckofcards = require('../services/deckofcards.js');

async function checkWin(playerHand, dealerHand, bet) {
    playerScore = await deckofcards.getHandValue(playerHand);
    dealerScore = await deckofcards.getHandValue(dealerHand);

    if (playerScore > 21)
        playerScore = 0;

    if (dealerScore > 21)
        dealerScore = 0;

    if (playerScore == 0 && dealerScore == 0) {
        console.log("Player and Dealer busted! Bets returned...");
        return bet;
    } else if (playerScore == 0) {
        console.log("Player busted! Bets given to Dealer...");
        return 0;
    } else if (playerScore == dealerScore) {
        console.log("Player and Dealer tied! Bets returned...");
        return bet;
    } else if (playerScore < dealerScore) {
        console.log("Dealer wins: " + dealerScore + " vs. " + playerScore);
        return 0;
    } else {
        console.log("Player wins: " + playerScore + " vs. " + dealerScore);
        if (playerHand.length >= 5) {
            console.log("FIVE CARD CHARLIE WHATTTT");
            return bet * 4;
        } else if (playerHand.length == 2 && playerScore == 21) {
            console.log("BLACKJACK!!!");
            return bet * 3
        } else {
            return bet * 2;
        }
    }
}

module.exports ={
	data: new SlashCommandBuilder().setName('blackjack').setDescription('Our main play blackjack command'),
	async execute(interaction){ 
		return interaction.reply('this is blackjack!');
	},
};