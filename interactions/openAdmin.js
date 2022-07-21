const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {

    id: "admin",
    async execute(interaction) {
        return interaction.reply({
            content: `Sorry ${interaction.user.username}, this button is not yet implemented!`,
            ephemeral: true
        })
    }
}
