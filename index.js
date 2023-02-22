require('dotenv').config();
/////////////////////////////////////////////////
const fs = require('node:fs');
const path = require('node:path');
//var mongodb = require('./mongodb.js')
const {Client,Events,GatewayIntentBits, Collection} = require("discord.js");
//Creating a new instance of our client
const client = new Client({intents:[GatewayIntentBits.Guilds]})

//Creates a new instance for a collection
client.commands = new Collection();
//goes into the commands folder to find commands
const commandsPath = path.join(__dirname, 'commands');
//Filters classes in the command folder. Looks to see if it ends with .js or not
const commandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));


//Loops through all the files in the command folder
for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //Basically creates an array of our commands
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }
    else{
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "exexcute" property`);
    }  
}

client.on(Events.InteractionCreate, async interaction =>{
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found`);
        return;}
    try{
        await command.execute(interaction)
    }catch(err){
        console.error(err);
        await interaction.reply({content: 'AHH SOMETHING BROKE', ephemeral: true});
    }
});

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

client.login(process.env.TOKEN);
