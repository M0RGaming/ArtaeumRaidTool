const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ContextMenuCommandBuilder, ApplicationCommandType, ButtonStyle} = require('discord.js');

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

                let embed = new EmbedBuilder()
                embed.setDescription(`This is the admin panel for raid: ${originalEmbed.title}`)
                embed.setFooter({text: `Roster ID: ${message.id}`})

                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('adminNote')
                            .setLabel('Edit Player Note')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('adminPing')
                            .setLabel('Ping Signed Up People')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('adminRole')
                            .setLabel('Change User Role')
                            .setStyle(ButtonStyle.Danger))

                const buttons2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('adminEdit')
                            .setLabel('Edit Roster Message')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('adminCopy')
                            .setLabel('Create Copy of Roster')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('adminDelete')
                            .setLabel('Delete Roster Message')
                            .setStyle(ButtonStyle.Danger)
                    );

                return interaction.reply({
                    embeds: [embed],
                    components: [buttons,buttons2],
                    ephemeral: true
                })

            } else {
                return interaction.reply({
                    content: `Sorry ${interaction.user.username}, only raid leads can use this feature!`,
                    ephemeral: true
                })
            }
        } catch (e) {
            console.log(e)
            return interaction.reply({ content: `Unable to open the admin panel for this message!`, ephemeral: true })
        }
    }
}
