const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent, Modal} = require('discord.js');

module.exports = {

    id: "adminDeleteConfirm",

    async execute(interaction) {
        let regex = /Roster ID: (.*)/g
        let footer = interaction.message.embeds[0].footer.text
        let delMessage = regex.exec(footer)[1]


        interaction.channel.messages.fetch(delMessage).then(msg => {
            try {
                msg.delete()
                return interaction.reply({
                    content: `The roster was deleted!`,
                    ephemeral: true
                })
            } catch (e) {
                return interaction.reply({
                    content: `The roster failed to be deleted!`,
                    ephemeral: true
                })
            }


        },() => {
            return interaction.reply({
                content: `The roster couldn't be found!`,
                ephemeral: true
            })
        })




    }



}
