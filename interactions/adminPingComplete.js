const {getVals} = require("../commonFunctions");

module.exports = {

    id: "adminPingModal",
    async execute(interaction) {

        let msg = interaction.fields.getTextInputValue('message');
        let rosterID = interaction.fields.getTextInputValue('roster');

        let roster = await interaction.channel.messages.fetch(rosterID)
        let fields = getVals(roster.embeds[0])
        let users = ""
        fields.dps.forEach((x) => {
            users += `<@${x[1]}> `
        })
        fields.heal.forEach((x) => {
            users += `<@${x[1]}> `
        })
        fields.tank.forEach((x) => {
            users += `<@${x[1]}> `
        })
        return interaction.reply(`${msg}\n\n${users}`)

    }
}
