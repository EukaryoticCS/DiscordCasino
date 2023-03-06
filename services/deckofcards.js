const axios = require('axios');

const apiPath = 'https://deckofcardsapi.com';
let deck_id = '';
let playerCards = {cards: []};
let dealerCards = {cards: []};

async function makeNewDeck() {
    let res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/new/shuffle?deck_count=6'//Endpoint goes here
    });
    deck_id = await res.data.deck_id;
}

async function drawDealerCards(count) {
    // console.log(count);
    res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/' + deck_id + '/draw/?count=' + count
    });
    for (card in res.data.cards) {
        // console.log(res.data.cards[card]);
        dealerCards.cards.push(res.data.cards[card]);
    }
}

async function drawPlayerCards(count) {
    // console.log(count);
    res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/' + deck_id + '/draw/?count=' + count
    });
    for (card in res.data.cards) {
        // console.log(res.data.cards[card]);
        playerCards.cards.push(res.data.cards[card]);
    }
    return res.data.cards;
}

function getPlayerCards() {
    let strCards = "";
    cards = playerCards.cards;
    for (card in cards) {
        strCards += cards[card].value.toLowerCase() + " of " + cards[card].suit.toLowerCase() + ", ";
    }
    return strCards.slice(0, -2);
}

function getDealerCards() {
    let strCards = "";
    cards = dealerCards.cards;
    strCards += cards[0].value.toLowerCase() + " of " + cards[0].suit.toLowerCase() + ", "
    for (count = 1; count < cards.length; count++) {
        strCards += "???, "
    }
    return (strCards.slice(0, -2));
}

async function startBlackJack() {
    deck_id = '';
    playerCards = {cards: []};
    dealerCards = {cards: []};
    await makeNewDeck();
    await drawDealerCards(2);
    //auto dealer moves. check dealer card and stop draw at at least 14
    while (getHandValue(dealerCards) < 17){
        drawDealerCards(1);
    }

    await drawPlayerCards(2);
}

function getHandValue(cards) {
    // console.log(cards.cards);
    for (card in cards.cards) { //Push Aces to the back of the hand for easier parsing
        // console.log(cards.cards[card]);
        if (cards.cards[card].value == 'ACE') {
            cards.cards.push(cards.cards.splice(card, 1)[0]);
        }
    }

    // console.log("Player cards:");
    // console.log(cards);

    value = 0;

    for (card in cards.cards) {
        // console.log(cards[card].value);
        switch (cards.cards[card].value) {
            case ('ACE'):
                if (value > 10) { //11, unless that would make the player bust
                    value += 1;
                } else {
                    value += 11;
                }
                break;
            case ('JACK'): //Fallthrough case statements to make each worth 10
            case ('QUEEN'):
            case ('KING'):
                value += 10;
                break;
            default: //Parse the value (number) as an int and add it
                value += parseInt(cards.cards[card].value);
                break;
        }
    }
    console.log(value);
    return value;
}

function checkBlackJackWin(bet, interaction) {
    playerScore = getHandValue(playerCards);
    dealerScore = getHandValue(dealerCards);

    if (playerScore > 21) //Player busted
        playerScore = 0;

    if (dealerScore > 21) //Dealer busted
        dealerScore = 0;

    if (playerScore == 0 && dealerScore == 0) {
        console.log("Player and Dealer busted! Bets returned...");
        interaction.reply("Player and Dealer busted! Bets returned...");
        return bet;
    } else if (playerScore == 0) {
        console.log("Player busted! Bets given to Dealer...");
        interaction.reply("Player busted! Bets given to Dealer...");
        return 0;
    } else if (playerScore == dealerScore) {
        console.log("Player and Dealer tied! Bets returned...");
        interaction.reply("Player and Dealer tied! Bets returned...");
        return bet;
    } else if (playerScore < dealerScore) {
        console.log("Dealer wins: " + dealerScore + " vs. " + playerScore);
        interaction.reply("Dealer wins: " + dealerScore + " vs. " + playerScore);
        return 0;
    } else {
        console.log("Player wins: " + playerScore + " vs. " + dealerScore);
        if (playerCards.cards.length >= 5) {
            console.log("FIVE CARD CHARLIE WHATTTT");
            interaction.reply("Player wins: " + playerScore + " (FIVE CARD CHARLIE WHATTTT)" + " vs. " + dealerScore + "... +" + bet * 4 + " currency!");
            return bet * 4;
        } else if (playerCards.cards.length == 2 && playerScore == 21) {
            console.log("BLACKJACK!!!");
            interaction.reply("Player wins: " + playerScore + " (BLACKJACK!!!)" + " vs. " + dealerScore + "... +" + bet * 3 + " currency!");
            return bet * 3;
        } else {
            interaction.reply("Player wins: " + playerScore + " vs. " + dealerScore + "... +" + bet * 2 + " currency!");
            return bet * 2;
        }
    }
}

// startBlackJack();

module.exports = {
    makeNewDeck,
    drawDealerCards,
    drawPlayerCards,
    getPlayerCards,
    getDealerCards,
    startBlackJack,
    getHandValue,
    checkBlackJackWin
}