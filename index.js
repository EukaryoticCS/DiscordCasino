var mongodb = require('./mongodb.js')
const fs = require('node:fs');
const path = require('node:path');
//Requiring necessities from discord.js
const {Client,Events,GatewayIntentBits, Collection} = require("discord.js");
//Requires dotenv then configures our .env file
require('dotenv').config();
//Creating a new instance of our client
const client = new Client({intents:[GatewayIntentBits.Guilds]})

//Creates a new instance for a collection
client.commands = new Collection();
//goes into the commands folder to find commands
const commandPath = path.join(__dirname, 'commands');
//Filters classes in the command folder. Looks to see if it ends with .js or not
const commandFiles = fs.readdirSync(commandPath).filter(file=>file.endsWith('.js'));


//Loops through all the files in the command file
for(const file of commandFiles){
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    //Basically creates an array of our commands
    client.command.set(command.data.name, command);
}

//useses the new instance of the bot to wake it up
client.once(Events.ClientReady, c=>{
    console.log('GOOOOOD MORNIN VEGAS');
    
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

//This checks if a chat input has an interaction with the bot and checks the command list
client.on(Events.InteractionCreate, async interaction =>{
    if(!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) return;
});

//This checks if a chat input has an interaction with the bot and checks the command list
client.on(Events.InteractionCreate, async interaction =>{
    if(!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try{
        await command.execute(interaction)
    }catch(err){
        console.error(err);
        await interaction.reply({content: 'AHH SOMETHING BROKE', ephemeral: true});
    }
});

client.login(process.env.TOKEN);
