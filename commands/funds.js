const {SlashCommandBuilder} = require('discord.js');
var mongodb = require('../mongodb.js');

module.exports ={
	data: new SlashCommandBuilder().setName('funds').setDescription('Shows your available funds'),
	async execute(interaction){ 
        let user = await mongodb.getUser(interaction.member.user.id);
        let funds = user.availableFunds;
		return interaction.followUp('FUNDS: ' + funds);
	},
};