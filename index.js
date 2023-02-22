//var mongodb = require('./mongodb.js')
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const pingCommand = require("./commands/pingCommand")
const embeded = require("./Embeded")
const { Client, GatewayIntentBits, Collection, Events,IntentsBitField, } = require("discord.js");
const deckofcards = require('./services/deckofcards.js');
dotenv.config();
const client = new Client({intents:[IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMessageReactions]})



client.once(Events.ClientReady, async c =>{
    const channel = await client.channels.fetch('1006328808917438546')
    console.log(channel);
    console.log('GOOOOOD MORNIN VEGAS');

     channel.send({ embeds: [embeded] });
     
    deckofcards.startBlackJack();
});


client.once(Event.Client,c => {

    console.log('I ran hoe');
    embeded.exampleEmbed();

    // pingCommand.execute();

});


// async function testMethodToGetAvailableFunds() {
//     try { //Get available funds
//         const user = await mongodb.getUser('447233441423949844');
//         let funds = user.availableFunds;
//         console.log(funds);
//     } catch {
//         // console.log("User doesn't exist!");
//         console.log("How did you get here?")
//     }

//     try { //make a new user
//         const newUser = await mongodb.createUser('447233441423949845');
//         console.log(newUser);
//     } catch {
//         console.log("No user created...")
//     }
// }

// testMethodToGetAvailableFunds();



client.login(process.env.TOKEN);

