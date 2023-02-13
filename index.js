const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const pingCommand = require("./commands/pingCommand")
const { Client, GatewayIntentBits, Collection, Events,IntentsBitField, } = require("discord.js");
dotenv.config();
const client = new Client({intents:[IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMessageReactions]})


client.once(Events.ClientReady, c=>{
    console.log('GOOOOOD MORNIN VEGAS');
});


client.once(Event.Client,c => {
    pingCommand.execute();
});



client.login(process.env.TOKEN);

