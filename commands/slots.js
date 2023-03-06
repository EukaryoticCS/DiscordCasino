const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('slots').setDescription('Brings up the slots'),
	async execute(interaction, btnSlots){ 
		interaction.reply({content: 'slots!', components: [btnSlots]});
	},
};
