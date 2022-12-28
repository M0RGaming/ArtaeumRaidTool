const { SlashCommandBuilder, Embed} = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent, Modal} = require('discord.js');

module.exports = {

    id: "adminDelete",

    async execute(interaction) {
        let footer = interaction.message.embeds[0].footer


        let regex = /This is the admin panel for raid: (.*)/g
        let description = interaction.message.embeds[0].description
        let rosterName = regex.exec(description)[1]


        let embed = new Embed()
        embed.setDescription(`Are you absolutely sure you wish to delete ${rosterName}?\nThis process is permanent and cannot be undone.\n\nIf you do not want to delete this roster, press the Dismiss Message blue text at the bottom.`)
        embed.setFooter(footer)

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('adminDeleteConfirm')
                    .setLabel(`Yes, I Am Sure.`)
                    .setStyle('DANGER'))


        return interaction.reply({
            embeds: [embed],
            components: [buttons],
            ephemeral: true
        })
    }



}
