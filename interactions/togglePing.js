module.exports = {

    id: "ping",
    async execute(interaction) {
        return interaction.reply({
            content: `Sorry ${interaction.user.username}, this button is not yet implemented!`,
            ephemeral: true
        })
    }
}
