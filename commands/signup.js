const { SlashCommandBuilder } = require('@discordjs/builders');
const { parseVals, getVals } = require('../commonFunctions.js')

let roleEmotes = {
    mdps: "<:magDPS:777982060320391219>",
    sdps: "<:stamDPS:777982060622905375>",
    heal: "<:heal:777982060433375293>",
    tank: "<:tank:777982060647415818>",
    remove: "⛔"
}

module.exports = {

    data: new SlashCommandBuilder()
        .setName('signup')
        .setDescription('Sign up for a raid!')
        .addStringOption( option => option.setName('roster').setDescription("Which roster would you like to sign up for?").setRequired(true))
        .addStringOption( option =>
            option.setName('role')
                .setDescription("Which Role would you like to sign up for?")
                .setRequired(true)
                .addChoices(
                    {name:'Magicka DPS',value:'mdps'},
                    {name:'Stamina DPS',value:'sdps'},
                    {name:'Healer',value:'heal'},
                    {name:'Tank',value:'tank'},
                    {name:'Unregister',value:'remove'},
                ))
        .addUserOption( option => option.setName('user').setDescription("Who would you like to sign up for this raid?").setRequired(false)),

    async execute(interaction) {

        let role = interaction.options.getString('role')
        let emote = roleEmotes[role]

        let roster = interaction.options.getString('roster');

        interaction.channel.messages.fetch(roster).then(msg => {

            if (msg.author.id !== process.env.id) {
                return interaction.reply({ content: `The selected roster was not sent by Artaeum Raid Tool!`, ephemeral: true })
            }

            let embed = msg.embeds[0]
            let fields = getVals(embed)

            let user = String(interaction.user.id)
            if (interaction.options.getUser('user')) {
                user = String(interaction.options.getUser('user').id)
            }


            if (role == "mdps" || role == "sdps") {

                fields.heal = fields.heal.filter(signups => signups[1] !== user);
                fields.tank = fields.tank.filter(signups => signups[1] !== user);
                fields.maybe = fields.maybe.filter(signups => signups[1] !== user);
                fields.wait = fields.wait.filter(signups => signups[1] !== user);

                if (fields.dps.filter(signups => signups[1] == user).length == 0) {
                    if (fields.dpsLim !== 0 && fields.dps.length >= fields.dpsLim) {
                        fields.wait.push([emote,user])
                    } else {
                        fields.dps.push([emote,user])
                    }
                } else {
                    let index = fields.dps.findIndex(arr => arr.includes(user))
                    fields.dps[index][0] = emote
                }

            } else if (role == "heal") {
                fields.dps = fields.dps.filter(signups => signups[1] !== user);
                fields.tank = fields.tank.filter(signups => signups[1] !== user);
                fields.maybe = fields.maybe.filter(signups => signups[1] !== user);
                fields.wait = fields.wait.filter(signups => signups[1] !== user);
                if (fields.heal.filter(signups => signups[1] == user).length == 0) {
                    if (fields.healLim !== 0 && fields.heal.length >= fields.healLim) {
                        fields.wait.push([emote,user])
                    } else {
                        fields.heal.push([emote,user])
                    }
                }
            } else if (role == "tank") {
                fields.dps = fields.dps.filter(signups => signups[1] !== user);
                fields.heal = fields.heal.filter(signups => signups[1] !== user);
                fields.maybe = fields.maybe.filter(signups => signups[1] !== user);
                fields.wait = fields.wait.filter(signups => signups[1] !== user);
                if (fields.tank.filter(signups => signups[1] == user).length == 0) {
                    if (fields.tankLim !== 0 && fields.tank.length >= fields.tankLim) {
                        fields.wait.push([emote,user])
                    } else {
                        fields.tank.push([emote,user])
                    }
                }
            } else if (role == "remove") {
                fields.dps = fields.dps.filter(signups => signups[1] !== user);
                fields.heal = fields.heal.filter(signups => signups[1] !== user);
                fields.tank = fields.tank.filter(signups => signups[1] !== user);
                fields.maybe = fields.maybe.filter(signups => signups[1] !== user);
                fields.wait = fields.wait.filter(signups => signups[1] !== user);
            }

            interaction.channel.messages.fetch(roster).then(msg => {
                msg.edit({embeds: [parseVals(embed, fields)]})
                let output = `${emote} <@${user}> has been signed up!`
                if (role == "remove") {
                    output = `<@${user}> has been removed from the roster!`
                }
                return interaction.reply({ content: output, ephemeral: true })
            })

        })

    }
}
