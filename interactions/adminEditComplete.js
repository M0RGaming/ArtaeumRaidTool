module.exports = {

    id: "adminEditMessage",

    async execute(interaction) {
        const name = interaction.fields.getTextInputValue('name');
        const desc = interaction.fields.getTextInputValue('description');
        const date = interaction.fields.getTextInputValue('date')
        const copyFrom = interaction.fields.getTextInputValue('copyfrom')

        let editMessage = await interaction.channel.messages.fetch(copyFrom)
        let embed = editMessage.embeds[0].toJSON()

        embed.fields[0].value = date
        embed.title = name
        embed.description = desc

        await editMessage.edit({embeds:[embed]})

        return interaction.reply({
            content: `Message was edited!`,
            ephemeral: true
        })
    }



}
