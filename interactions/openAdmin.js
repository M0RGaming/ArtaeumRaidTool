const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const {Embed} = require("@discordjs/builders");

module.exports = {

    id: "admin",
    async execute(interaction) {
        let originalEmbed = interaction.message.embeds[0]
        let user = String(interaction.user.id)
        let regex = /<@(.*?)>/g
        if (user === regex.exec(originalEmbed.footer.text)[1]) {

            let embed = new Embed()
            embed.setDescription(`This is the admin panel for raid: ${originalEmbed.title}`)
            embed.setFooter({text: `Roster ID: ${interaction.message.id}`})

            const buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('adminNote')
                        .setLabel('Edit Player Note')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('adminPing')
                        .setLabel('Ping Signed Up People')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('adminRole')
                        .setLabel('Change User Role')
                        .setStyle('DANGER'),
                    new MessageButton()
                        .setCustomId('adminCopy')
                        .setLabel('Create Copy of Roster')
                        .setStyle('PRIMARY'),
                );

            return interaction.reply({
                embeds: [embed],
                components: [buttons],
                ephemeral: true
            })

        } else {
            return interaction.reply({
                content: `Sorry ${interaction.user.username}, only raid leads can use this feature!`,
                ephemeral: true
            })
        }
    }
}
