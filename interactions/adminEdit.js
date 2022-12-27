const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent, Modal} = require('discord.js');

module.exports = {

    id: "adminEdit",

    async execute(interaction) {
        let regex = /Roster ID: (.*)/g
        let footer = interaction.message.embeds[0].footer.text
        let editMessage = regex.exec(footer)[1]


        interaction.channel.messages.fetch(editMessage).then(msg => {
            const modal = new Modal()
                .setCustomId('adminEditMessage')
                .setTitle('Artaeum Raid Tool: Edit Message');

            const name = new TextInputComponent()
                .setCustomId('name')
                .setLabel("What is the name of the raid?")
                .setStyle('SHORT')
                .setRequired(true);
            const description = new TextInputComponent()
                .setCustomId('description')
                .setLabel("What is the raid about?")
                .setStyle('PARAGRAPH');

            const date = new TextInputComponent()
                .setCustomId('date')
                .setLabel("When is the raid?")
                .setStyle('SHORT');




            name.setValue(msg.embeds[0].title)
            description.setValue(msg.embeds[0].description)

            let oldDate = msg.embeds[0].fields[0].value
            date.setValue(oldDate)

            const copyFromModal = new TextInputComponent()
                .setCustomId('copyfrom')
                .setLabel("What message should be edited")
                .setStyle('SHORT')
                .setValue(editMessage)

            modal.addComponents(
                new MessageActionRow().addComponents(name),
                new MessageActionRow().addComponents(description),
                new MessageActionRow().addComponents(date),
                new MessageActionRow().addComponents(copyFromModal)
            );

            return interaction.showModal(modal);
        })
    }



}
