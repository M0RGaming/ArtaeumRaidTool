const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');

module.exports = {

    id: "adminCopy",

    async execute(interaction) {
        let regex = /Roster ID: (.*)/g
        let footer = interaction.message.embeds[0].footer.text
        let editMessage = regex.exec(footer)[1]


        interaction.channel.messages.fetch(editMessage).then(msg => {
            const modal = new ModalBuilder()
                .setCustomId('createModal')
                .setTitle('Artaeum Raid Tool: Creation');

            const name = new TextInputBuilder()
                .setCustomId('name')
                .setLabel("What is the name of the raid?")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
            const description = new TextInputBuilder()
                .setCustomId('description')
                .setLabel("What is the raid about?")
                .setStyle(TextInputStyle.Paragraph);

            const date = new TextInputBuilder()
                .setCustomId('date')
                .setLabel("When is the raid?")
                .setStyle(TextInputStyle.Short);

            name.setValue(msg.embeds[0].title)
            description.setValue(msg.embeds[0].description)

            let oldDate = msg.embeds[0].fields[0].value
            date.setValue(oldDate)

            const copyFromModal = new TextInputBuilder()
                .setCustomId('copyfrom')
                .setLabel("What message should the roster be copied from")
                .setStyle(TextInputStyle.Short)
                .setValue(editMessage)

            modal.addComponents(
                new ActionRowBuilder().addComponents(name),
                new ActionRowBuilder().addComponents(description),
                new ActionRowBuilder().addComponents(date),
                new ActionRowBuilder().addComponents(copyFromModal)
            );

            return interaction.showModal(modal);
        })
    }



}
