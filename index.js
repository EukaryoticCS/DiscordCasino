require('dotenv').config();
/////////////////////////////////////////////////
const fs = require('node:fs');
const path = require('node:path');
var mongodb = require('./mongodb.js')
const {Client,Events,GatewayIntentBits, Collection, ButtonInteraction, InteractionResponse} = require("discord.js");
const deckofcards = require('./services/deckofcards.js');
//Creating a new instance of our client
const client = new Client({intents:[GatewayIntentBits.Guilds]})
//Creates a new instance for a collection
client.commands = new Collection();
//goes into the commands folder to find commands
const commandsPath = path.join(__dirname, 'commands');
const embeded = require("./Embeded")
//Filters classes in the command folder. Looks to see if it ends with .js or not
const commandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));

let deck_id = null;
var bet = 0;


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
    if(interaction.isButton()) {
        if(interaction.customId == 'btnHit'){
            interaction.reply('You hit hit! :smile:');
        }
        if(interaction.customId == 'btnBJBet1'){
            bet +=1;
            interaction.reply('You bet 1 currecy! :moneybag: Your current bet is '+bet);
        }
        if(interaction.customId == 'btnBJBet10'){
            bet+=10;
            interaction.reply('You bet 10 currecy! :moneybag: Your current bet is '+bet);
        }
        if(interaction.customId == 'btnBJBet100'){
            bet+=100;
            interaction.reply('You bet 100 currecy! :moneybag: Your current bet is '+bet);
        }
        if(interaction.customId == 'btnStand'){
            // await interaction.deferReply();
            console.log(bet);
            console.log(deckofcards.checkBlackJackWin(bet, interaction));
            bet = 0;
            console.log(bet);
        }



    }

    if(interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        // await interaction.deferReply();
        // let user = await mongodb.getUser(interaction.member.user.id);
        // if (!user) {
        //     user = await mongodb.createUser(interaction.member.user.id);
        // } else {
        //     console.log(user);
        // }

        if(!command) {
            console.error(`No command matching ${interaction.commandName} was found`);
            return;}
        try{
            if (interaction.commandName == 'blackjack') {
                console.log('running blackjack!');
            }
            await command.execute(interaction);
        }catch(err){
            console.error(err);
            await interaction.reply({content: 'AHH SOMETHING BROKE', ephemeral: true});
        }
    }
});

//useses the new instance of the bot to wake it up
client.once(Events.ClientReady, async c =>{
    const channel = await client.channels.fetch('1006328808917438546')
    //console.log(channel);
    console.log('GOOOOOD MORNIN VEGAS');

    //channel.send({ embeds: [embeded] });

    // deckofcards.startBlackJack();
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