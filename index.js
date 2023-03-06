require('dotenv').config();
/////////////////////////////////////////////////
const fs = require('node:fs');
const path = require('node:path');
var mongodb = require('./mongodb.js')
const { Client, Events, GatewayIntentBits, Collection, ButtonInteraction, InteractionResponse } = require("discord.js");
const deckofcards = require('./services/deckofcards.js');
//Creating a new instance of our client
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
//Creates a new instance for a collection
client.commands = new Collection();
//goes into the commands folder to find commands
const commandsPath = path.join(__dirname, 'commands');
const embeded = require("./Embeded")
//Filters classes in the command folder. Looks to see if it ends with .js or not
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const btnBlackjack = require("./schemas/btnBlackjack.js");

var bet = 0;
var user;
var userID;

//Loops through all the files in the command folder
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //Basically creates an array of our commands
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton()) {
        if (interaction.member.user.id == userID) {
            if (interaction.customId == 'btnHit') {
                // console.log(interaction.message);
                cards = await deckofcards.drawPlayerCards(1);
                // console.log(interaction);
                interaction.message.edit({content: interaction.message.content, components: []});
                interaction.reply({content: 'Card drawn!\n\nDEALER CARDS: ' + deckofcards.getDealerCards() + '\n\nYOUR CARDS: ' + deckofcards.getPlayerCards() + "\nBET: " + bet, components: [btnBlackjack.btnBlackjack]});
            }
            if (interaction.customId == 'btnBJBet1') {
                await interaction.deferReply();
                if (user.availableFunds < 1) {
                    interaction.followUp({content: "You don't have enough money to bet! :rofl:", ephemeral: true});
                } else {
                    mongodb.updateUser(userID, -1);
                    bet += 1;
                    interaction.message.edit({content: interaction.message.content, components: []});
                    interaction.followUp({content: 'You bet 1 currency! :moneybag:\n\nDEALER CARDS: ' + deckofcards.getDealerCards() + '\nYOUR CARDS: ' + deckofcards.getPlayerCards() + "\nBET: " + bet, components: [btnBlackjack.btnBlackjack]});
                }
            }
            if (interaction.customId == 'btnBJBet10') {
                await interaction.deferReply();
                if (user.availableFunds < 10) {
                    interaction.followUp({content: "You don't have enough money to bet! :rofl:\n\nDEALER CARDS: ", ephemeral: true});
                } else {
                    mongodb.updateUser(userID, -10);
                    bet += 10;
                    interaction.message.edit({content: interaction.message.content, components: []});
                    interaction.followUp({content: 'You bet 10 currency! :moneybag:\n\nDEALER CARDS:' + deckofcards.getDealerCards() + '\nYOUR CARDS: ' + deckofcards.getPlayerCards() + "\nBET: " + bet, components: [btnBlackjack.btnBlackjack]});
                }
            }
            if (interaction.customId == 'btnBJBet100') {
                await interaction.deferReply();
                if (user.availableFunds < 100) {
                    interaction.followUp({content: "You don't have enough money to bet! :rofl:", ephemeral: true});
                } else {
                    mongodb.updateUser(userID, -100);
                    bet += 100;
                    interaction.message.edit({content: interaction.message.content, components: []});
                    interaction.followUp({content: 'You bet 100 currency! :moneybag:\n\nDEALER CARDS: ' + deckofcards.getDealerCards() + '\nYOUR CARDS: ' + deckofcards.getPlayerCards() + "\nBET: " + bet, components: [btnBlackjack.btnBlackjack]});
                }
            }
            if (interaction.customId == 'btnStand') {
                // await interaction.deferReply();
                // console.log(bet);
                mongodb.updateUser(userID, deckofcards.checkBlackJackWin(bet, interaction));
                bet = 0;
                interaction.message.edit({content: interaction.message.content, components: []});
                // console.log(bet);
            }
        } else {
            interaction.reply({content: "That's not your game, jackass!", ephemeral:true})
        }
    }

    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        userID = interaction.member.user.id;
        await interaction.deferReply();
        user = await mongodb.getUser(userID);
        if (!user) {
            user = await mongodb.createUser(userID);
        } else {
            // console.log(user);
        }

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found`);
            return;
        }
        try {
            if (interaction.commandName == 'blackjack') {
                console.log('running blackjack!');
                if (user.availableFunds < 30) { //Do not do the command
                    interaction.reply({content: "You don't have enough money to play Blackjack! :rofl:", ephemeral: true});
                } else {
                    mongodb.updateUser(userID, -30);
                    bet = 30;
                    await command.execute(interaction, btnBlackjack.btnBlackjack);
                }
            } else {
                await command.execute(interaction);
            }
        } catch (err) {
            console.error(err);
            interaction.reply('AHH SOMETHING BROKE');
        }
    }
});

//useses the new instance of the bot to wake it up
client.once(Events.ClientReady, async c => {
    const channel = await client.channels.fetch('1006328808917438546');
    //console.log(channel);
    console.log('GOOOOOD MORNIN VEGAS');
});

client.login(process.env.TOKEN);