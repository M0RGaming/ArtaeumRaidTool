const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new Event')
		.addStringOption(option => option.setName('name').setDescription('The Name of the event').setRequired(true))
		.addStringOption(option => option.setName('description').setDescription('The Description of the event').setRequired(true))
		.addIntegerOption(option => option.setName('date').setDescription('The Date of the event (in UNIX time)').setRequired(true))
		.addIntegerOption(option => option.setName('dpslim').setDescription('(Optional) The maximum amount of DPS').setRequired(false))
		.addIntegerOption(option => option.setName('heallim').setDescription('(Optional) The maximum amount of Healers').setRequired(false))
		.addIntegerOption(option => option.setName('tanklim').setDescription('(Optional) The maximum amount of Tanks').setRequired(false)),
		

	async execute(interaction) {
		const name = interaction.options.getString('name');
		const desc = interaction.options.getString('description');
		const date = interaction.options.getInteger('date');
		const dpsLim = interaction.options.getInteger('dpslim');
		const healLim = interaction.options.getInteger('heallim');
		const tankLim = interaction.options.getInteger('tanklim');
		//console.log(dpsLim ? `DPS (0/${dpsLim})` : "DPS (0)")
		//console.log(healLim ? `Healers (0/${healLim})` : "Healers (0)")
		const embed = {
			"title": name,
			"color": 65535,
			"description": desc.replace("\\n","\n"),
			"timestamp": "",
			"author": {
				"name": ""
			},
			"image": {},
			"thumbnail": {},
			/* // Possible option for storing data
			"footer": {
				text: 'Some footer text here',
				icon_url: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Blank.png?DATAGOESHERE'
			},
			//*/
			"footer": {},
			"fields": [
				{
					"name": "Date",
					"value": `<t:${date}>`
				},
				{
					"name": dpsLim ? `DPS (0/${dpsLim})` : "DPS (0)",
					"value": "​",
					"inline": true
				},
				{
					"name": healLim ? `Healers (0/${healLim})` : "Healers (0)",
					"value": "​",
					"inline": true
				},
				{
					"name": tankLim ? `Tanks (0/${tankLim})` : "Tanks (0)",
					"value": "​",
					"inline": true
				},
				{
					"name": "​",
					"value": "​"
				},
				{
					"name": "Maybe (0)",
					"value": "​",
					"inline": true
				},
				{
					"name": "Wait List (0)",
					"value": "​",
					"inline": true
				}
			]
		}
		const role = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('role')
					.setPlaceholder('Select your role to Sign Up!')
					.addOptions([
						{
							label: 'Magicka DPS',
							description: 'Sign up as a Magicka Based Damage Dealer',
							value: 'mdps',
							emoji: {
                                name: "magDPS",
                                id: "777982060320391219"
                            }
						},
						{
							label: 'Stamina DPS',
							description: 'Sign up as a Stamina Based Damage Dealer',
							value: 'sdps',
							emoji: {
                                name: "stamDPS",
                                id: "777982060622905375"
                            }
						},
						{
							label: 'Healer',
							description: 'Sign up as a Healer',
							value: 'heal',
							emoji: {
                                name: "heal",
                                id: "777982060433375293"
                            }
						},
						{
							label: 'Tank',
							description: 'Sign up as a Tank',
							value: 'tank',
							emoji: {
                                name: "tank",
                                id: "777982060647415818"
                            }
						},
						{
							label: 'Remove From Roster',
							description: 'Unregister from the raid.',
							value: 'remove',
							emoji: {
                                name: "⛔",
                                id: null
                            }
						},
					]),
			);
		const classes = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('class')
					.setPlaceholder('Select your class! (Optional)')
					.addOptions([
						{
							label: 'Sorcerer',
							description: 'Mark yourself as a Sorcerer.',
							value: 'sorc',
							emoji: {
                                name: "sorc",
                                id: "776723019652792320"
                            }
						},
						{
							label: 'Templar',
							description: 'Mark yourself as a Templar.',
							value: 'templar',
							emoji: {
                                name: "templar",
                                id: "776723019652530186"
                            }
						},
						{
							label: 'Nightblade',
							description: 'Mark yourself as a NB.',
							value: 'nb',
							emoji: {
                                name: "nb",
                                id: "776723019283431456"
                            }
						},
						{
							label: 'Warden',
							description: 'Mark yourself as a Warden.',
							value: 'warden',
							emoji: {
                                name: "warden",
                                id: "776723019422367744"
                            }
						},
						{
							label: 'Necromancer',
							description: 'Mark yourself as a Necromancer.',
							value: 'necro',
							emoji: {
                                name: "necro",
                                id: "776723019585552405"
                            }
						},
						{
							label: 'Dragonknight',
							description: 'Mark yourself as a DK.',
							value: 'dk',
							emoji: {
                                name: "dk",
                                id: "776723019489083402"
                            }
						},
						
						{
							label: 'No Class',
							description: 'Class not specified',
							value: 'remove',
							emoji: {
                                name: "⛔",
                                id: null
                            }
						},
					]),
			);
		const buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('sets')
					.setLabel('Select Support Sets')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('ping')
					.setLabel('Toggle Ping Before Raid')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('admin')
					.setLabel('Open Admin Panel')
					.setStyle('DANGER'),
			);

		//return interaction.reply(`Event ${name} with description ${desc} and date <t:${date}>`);
		return interaction.reply({ embeds: [embed], components: [role, classes, buttons] })
	},
};