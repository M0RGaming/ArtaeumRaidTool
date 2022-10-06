const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent, Modal} = require('discord.js');

module.exports = {

    id: "adminPing",
    async execute(interaction) {

        const modal = new Modal()
            .setCustomId('adminPingModal')
            .setTitle('Artaeum Raid Tool: Admin Ping');

        const message = new TextInputComponent()
            .setCustomId('message')
            .setLabel("What message would you like to send?")
            .setStyle('PARAGRAPH');


        let regex = /Roster ID: (.*)/g
        let rosterID = regex.exec(interaction.message.embeds[0].footer.text)[1]

        const originalRoster = new TextInputComponent()
            .setCustomId('roster')
            .setLabel("From what roster should everyone be pinged?")
            .setStyle('SHORT')
            .setValue(rosterID)


        modal.addComponents(
            new MessageActionRow().addComponents(message),
            new MessageActionRow().addComponents(originalRoster),
        );

        return interaction.showModal(modal);

    }
}
