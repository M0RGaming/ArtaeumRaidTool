const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {

    id: "createModal",

    async execute(interaction) {
        const name = interaction.fields.getTextInputValue('name');
        const desc = interaction.fields.getTextInputValue('description');
        const date = interaction.fields.getTextInputValue('date')


        let user = interaction.user.username
        let userID = interaction.user.id


        let dpsLim = 0
        let healLim = 0
        let tankLim = 0
        try {
            const limits = interaction.fields.getTextInputValue('limits')
            let lim = limits.split("/")
            dpsLim = lim[0]
            healLim = lim[1]
            tankLim = lim[2]
        } catch (e) {}

        let prereq = ""
        try {
            prereq = interaction.fields.getTextInputValue('prereqs')
        } catch (e) {
            //console.log("No Prerequisite Roles.")
        }


        let embed = {
            "title": name,
            "color": 65535,
            "description": desc ? desc.replace("\\n","\n") : "​",
            "timestamp": "",
            "author": {
                "name": ""
            },
            "image": {},
            "thumbnail": {},
            "footer": {text: `Raid Lead: @${user} <@${userID}>\nRaid Lead can open the Admin Panel via the apps menu after right clicking`},
            "fields": [
                {
                    "name": "Date",
                    "value": date ? date : "​"
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

        try {
            const copyFrom = interaction.fields.getTextInputValue('copyfrom')
            let copyMessage = await interaction.channel.messages.fetch(copyFrom)
            embed.fields = copyMessage.embeds[0].fields
            embed.fields[0].value = date
        } catch (e) {

        }

        if (prereq !== "") {

            let prereqOut = {
                "name": "Prerequisite Roles",
                "value": prereq
            }

            embed.fields.push(prereqOut)

        }

        const role = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('role')
                    .setPlaceholder('Select your role to Sign Up!')
                    .addOptions([
                        {
                            label: 'Ranged DPS',
                            description: 'Sign up as a primarily Ranged Damage Dealer',
                            value: 'mdps',
                            emoji: {
                                name: "magDPS",
                                id: "777982060320391219"
                            }
                        },
                        {
                            label: 'Melee DPS',
                            description: 'Sign up as a primarily Melee Damage Dealer',
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
        /*
        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('note')
                    .setLabel('Edit Player Note')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('admin')
                    .setLabel('Open Admin Panel')
                    .setStyle('DANGER'),
            );
        */
        //return interaction.reply(`Event ${name} with description ${desc} and date <t:${date}>`);
        return interaction.reply({ embeds: [embed], components: [role, classes] })
    }



}
