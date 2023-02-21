const axios = require('axios');

const apiPath = 'https://deckofcardsapi.com';
let deck_id = '';

async function makeNewDeck() {
    let res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/new/shuffle'//Endpoint goes here
    });
    let deckID = res.data.deck_id;
    // console.log(deckID);

    return deckID;
}

async function drawCard(player, deck_id, count) {
    let playerCards = [];
    let strPlayerCards = '';

    res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/' + deck_id + '/draw/?count=' + count
    });

    playerCards = res.data.cards;
    playerCards.forEach(function(card) {
        strPlayerCards += card.code + ',';
    })
    // console.log(strPlayerCards);

    res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/' + deck_id + '/pile/' + player + '/add/?cards=' + strPlayerCards
    })
    return strPlayerCards;
}

async function startBlackJack() {
    deck_id = await makeNewDeck();
    await drawCard('Player', deck_id, 3);
    await drawCard('Dealer', deck_id, 3);
    // console.log(await getPlayerCards('Player', deck_id));
    // console.log(await getPlayerCards('Dealer', deck_id));

    getHandValue(await getPlayerCards('Player', deck_id));
    getHandValue(await getPlayerCards('Dealer', deck_id));
    return deck_id;
}

async function getPlayerCards(player, deck_id) {
    let playerCards = await axios({
        method: 'get', 
        url: apiPath + '/api/deck/' + deck_id + '/pile/' + player + '/list'
    })
    // console.log(player + ': ');
    // console.log(playerCards.data.piles[player].cards);
    return playerCards.data.piles[player].cards;
}

function getHandValue(cards) {
    console.log(cards);
    for (card in cards) { //Push Aces to the back of the hand for easier parsing
        // console.log(cards[card]);
        if (cards[card].value == 'ACE') {
            cards.push(cards.splice(cards.indexOf(card), 1)[0]);
        }
    }

    value = 0;

    for (card in cards) {
        // console.log(card.value);
        switch (cards[card].value) {
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
                value += parseInt(cards[card].value);
                break;
        }
    }
    console.log(value);
    return value;
}

// startBlackJack();

module.exports = {
    makeNewDeck,
    drawCard,
    startGame: startBlackJack,
    getPlayerCards,
    getHandValue
}