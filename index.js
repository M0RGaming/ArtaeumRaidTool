const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.token

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(token);
client.once('ready', () => {
	console.log('Ready!');
});


client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}


client.interactions = new Collection();

const interactionFiles = fs.readdirSync('./interactions').filter(file => file.endsWith('.js'));
for (const file of interactionFiles) {
	const action = require(`./interactions/${file}`);
	client.interactions.set(action.id, action);
}



client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	} else if (interaction.isButton() || interaction.isSelectMenu() || interaction.isModalSubmit()) {

		const action = client.interactions.get(interaction.customId);

		if (!action) return;

		try {
			await action.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this interaction!', ephemeral: true });
		}

	} else {
		return;
	}


});


