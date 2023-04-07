const {
    ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder
} = require('discord.js');

module.exports = {

    id: "adminPing",
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('adminPingModal')
            .setTitle('Artaeum Raid Tool: Admin Ping');

        const message = new TextInputBuilder()
            .setCustomId('message')
            .setLabel("What message would you like to send?")
            .setStyle(TextInputStyle.Paragraph);


        let regex = /Roster ID: (.*)/g
        let rosterID = regex.exec(interaction.message.embeds[0].footer.text)[1]

        const originalRoster = new TextInputBuilder()
            .setCustomId('roster')
            .setLabel("From what roster should everyone be pinged?")
            .setStyle(TextInputStyle.Short)
            .setValue(rosterID)


        modal.addComponents(
            new ActionRowBuilder().addComponents(message),
            new ActionRowBuilder().addComponents(originalRoster),
        );

        return interaction.showModal(modal);

    }
}
