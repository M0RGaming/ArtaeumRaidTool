const {Modal, TextInputComponent, MessageActionRow} = require("discord.js");
const {getVals} = require("../commonFunctions");
module.exports = {

    id: "adminNote",
    async execute(interaction) {
        return interaction.reply({ content: `Sorry, this feature is not yet finished!`, ephemeral: true })

        const modal = new Modal()
            .setCustomId('adminPingModal')
            .setTitle('Artaeum Raid Tool: Admin Ping');

        const message = new TextInputComponent()
            .setCustomId('message')
            .setLabel("What message would you like to send?")
            .setStyle('PARAGRAPH');


        let regex = /Roster ID: (.*)/g
        let rosterID = regex.exec(interaction.message.embeds[0].footer.text)[1]

        let roster = await interaction.channel.messages.fetch(rosterID)
        let fields = getVals(roster.embeds[0])
        let users = []
        fields.dps.forEach((x) => {
            users.push(x[1])
        })
        fields.heal.forEach((x) => {
            users.push(x[1])
        })
        fields.tank.forEach((x) => {
            users.push(x[1])
        })

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
