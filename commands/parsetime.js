const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent} = require('discord.js');
const chrono = require('chrono-node');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('parsetime')
        .setDescription('Get the EPOCH value for a normal time string')
        .addStringOption( option => option.setName('time').setDescription("What time string would you like to convert to EPOCH?").setRequired(true)),

    async execute(interaction) {
        try {
            let time = interaction.options.getString('time');
            let parsedTime = Math.floor(chrono.parseDate(time).getTime()/1000);
            let message = `Epoch Time: ${parsedTime}\n\n<t:${parsedTime}> (<t:${parsedTime}:R>)\n\`<t:${parsedTime}> (<t:${parsedTime}:R>)\``
            return interaction.reply({ content: message, ephemeral: true })
        } catch (e) {
            return interaction.reply({ content: `An error occurred while trying to convert this string into epoch time!`, ephemeral: true })
        }
    }
}
