const {MessageActionRow, MessageButton} = require('discord.js');
const {Embed, ContextMenuCommandBuilder} = require("@discordjs/builders");
const {ApplicationCommandType} = require("discord-api-types/v8");

module.exports = {

    data: new ContextMenuCommandBuilder()
        .setName('Open Admin Panel')
        .setType(ApplicationCommandType.Message),

    async execute(interaction) {
        let message = interaction.targetMessage

        if (message.author.id !== process.env.id) {
            return interaction.reply({
                content: `You can only open the admin panel on rosters created by Artaeum Raid Tool!`,
                ephemeral: true
            })
        }
        try {



            let originalEmbed = message.embeds[0]
            let user = String(interaction.user.id)
            let regex = /<@(.*?)>/g
            if (user === regex.exec(originalEmbed.footer.text)[1]) {

                let embed = new Embed()
                embed.setDescription(`This is the admin panel for raid: ${originalEmbed.title}`)
                embed.setFooter({text: `Roster ID: ${message.id}`})

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
                        new MessageButton()
                            .setCustomId('adminEdit')
                            .setLabel('Edit Roster Message')
                            .setStyle('SECONDARY')
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
        } catch (e) {
            //console.log(e)
            return interaction.reply({ content: `Unable to open the admin panel for this message!`, ephemeral: true })
        }
    }
}
