const axios = require('axios');

const apiPath = 'https://deckofcardsapi.com';
let deck_id = '';
// const AxiosRequestConfig = {
//     httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//     })
// };

async function makeNewDeck() {
    let res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/new/shuffle'//Endpoint goes here
    });
    let deckID = res.data.deck_id;
    console.log(deckID);

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
    console.log(strPlayerCards);

    res = await axios({
        method: 'get',
        url: apiPath + '/api/deck/' + deck_id + '/pile/' + player + '/add/?cards=' + strPlayerCards
    })
}

async function startGame() {
    deck_id = await makeNewDeck();
    drawCard('Player', deck_id, 2);
    drawCard('Dealer', )
}
startGame();