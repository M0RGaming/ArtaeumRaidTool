const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent, Modal} = require('discord.js');
const {getVals} = require("../commonFunctions");

const emotes = {
    mdps: "<:magDPS:777982060320391219>",
    sdps: "<:stamDPS:777982060622905375>",
    heal: "<:heal:777982060433375293>",
    tank: "<:tank:777982060647415818>"
}

module.exports = {

    id: "adminRole",

    async execute(interaction) {
        let regex = /Roster ID: (.*)/g
        let footer = interaction.message.embeds[0].footer.text
        let editMessage = regex.exec(footer)[1]


        interaction.channel.messages.fetch(editMessage).then(msg => {
            return interaction.reply({ content: `Sorry, this feature is not yet finished!`, ephemeral: true })

            let embed = interaction.message.embeds[0]
            let fields = getVals(embed)


            const modal = new Modal()
                .setCustomId('adminEditRole')
                .setTitle('Artaeum Raid Tool: Edit Message');

            const roles = new MessageSelectMenu()
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
                ]);




            const editFromModal = new TextInputComponent()
                .setCustomId('editfrom')
                .setLabel("What roster should be edited")
                .setStyle('SHORT')
                .setValue(editMessage)

            modal.addComponents(
                new MessageActionRow().addComponents(name),
                new MessageActionRow().addComponents(description),
                new MessageActionRow().addComponents(date),
                new MessageActionRow().addComponents(editFromModal)
            );

            return interaction.showModal(modal);
        })
    }



}
