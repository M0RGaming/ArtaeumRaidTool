const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create a new Event')
        .addIntegerOption(option => option.setName('dpslim').setDescription('(Optional) The maximum amount of DPS').setRequired(false))
        .addIntegerOption(option => option.setName('heallim').setDescription('(Optional) The maximum amount of Healers').setRequired(false))
        .addIntegerOption(option => option.setName('tanklim').setDescription('(Optional) The maximum amount of Tanks').setRequired(false))
        .addStringOption( option => option.setName('prereq').setDescription("(Optional) What discord roles are required to sign up?").setRequired(false))
        .addStringOption(option => option.setName('copyfrom').setDescription('(Optional) Copy roster from previous run (Send the MessageID)').setRequired(false)),
    async execute(interaction) {

        //interaction.channel.messages.fetch('983103125764337775').then(msg => {console.log(msg)})


        const modal = new Modal()
            .setCustomId('createModal')
            .setTitle('Artaeum Raid Tool: Creation');

        const name = new TextInputComponent()
            .setCustomId('name')
            .setLabel("What is the name of the raid?")
            .setStyle('SHORT')
            .setRequired(true);
        const description = new TextInputComponent()
            .setCustomId('description')
            .setLabel("What is the raid about?")
            .setStyle('PARAGRAPH');

        const date = new TextInputComponent()
            .setCustomId('date')
            .setLabel("When is the raid?")
            .setStyle('SHORT');





        let dpsLim = interaction.options.getInteger('dpslim');
        let healLim = interaction.options.getInteger('heallim');
        let tankLim = interaction.options.getInteger('tanklim');


        let copyFrom = interaction.options.getString('copyfrom');

        if (copyFrom) {
            interaction.channel.messages.fetch(copyFrom).then(msg => {
                //console.log(msg)

                if (msg.author.id !== process.env.id) {
                    return interaction.reply({ content: `The message to copy from is not sent by Artaeum Raid Tool!`, ephemeral: true })
                }

                name.setValue(msg.embeds[0].title)
                description.setValue(msg.embeds[0].description)

                let oldDate = msg.embeds[0].fields[0].value
                date.setValue(oldDate)

                const copyFromModal = new TextInputComponent()
                    .setCustomId('copyfrom')
                    .setLabel("What message should the roster be copied from")
                    .setStyle('SHORT')
                    .setValue(copyFrom)

                modal.addComponents(
                    new MessageActionRow().addComponents(name),
                    new MessageActionRow().addComponents(description),
                    new MessageActionRow().addComponents(date),
                    new MessageActionRow().addComponents(copyFromModal)
                );

                return interaction.showModal(modal);
            })
        } else {

            modal.addComponents(
                new MessageActionRow().addComponents(name),
                new MessageActionRow().addComponents(description),
                new MessageActionRow().addComponents(date)
            );

            if (dpsLim || healLim || tankLim) {
                let out = dpsLim ? `${dpsLim}/` : "0/"
                out += healLim ? `${healLim}/` : "0/"
                out += tankLim ? `${tankLim}` : "0"
                const limits = new TextInputComponent()
                    .setCustomId('limits')
                    .setLabel("What are the per role limits (DPS/Heal/Tank)")
                    .setStyle('SHORT')
                    .setValue(out)
                modal.addComponents(new MessageActionRow().addComponents(limits))
            }

            let prereqs = interaction.options.getString('prereq');
            if (prereqs) {
                const prereq = new TextInputComponent()
                    .setCustomId('prereqs')
                    .setLabel("Prerequisite Tags (Use slash command to fill)")
                    .setStyle('PARAGRAPH')
                    .setValue(prereqs)
                modal.addComponents(new MessageActionRow().addComponents(prereq))

            }


            await interaction.showModal(modal);
        }
    }
}
