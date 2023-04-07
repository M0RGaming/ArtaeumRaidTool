const {
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle
} = require('discord.js');

module.exports = {

    id: "adminDelete",

    async execute(interaction) {
        let footer = interaction.message.embeds[0].footer


        let regex = /This is the admin panel for raid: (.*)/g
        let description = interaction.message.embeds[0].description
        let rosterName = regex.exec(description)[1]


        let embed = new EmbedBuilder()
        embed.setDescription(`Are you absolutely sure you wish to delete ${rosterName}?\nThis process is permanent and cannot be undone.\n\nIf you do not want to delete this roster, press the Dismiss Message blue text at the bottom.`)
        embed.setFooter(footer)

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('adminDeleteConfirm')
                    .setLabel(`Yes, I Am Sure.`)
                    .setStyle(ButtonStyle.Danger))


        return interaction.reply({
            embeds: [embed],
            components: [buttons],
            ephemeral: true
        })
    }



}
