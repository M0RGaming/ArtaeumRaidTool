const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent} = require('discord.js');
const { parseVals, getVals } = require('../commonFunctions.js')

let emotes = {
    dps: ['<:magDPS:777982060320391219>','<:stamDPS:777982060622905375>'],
    mdps: ['<:magsorc:755916823261872199>','<:magplar:755916814898430042>','<:magdk:755916821227503636>','<:magden:755916806408896634>','<:magcro:755916820455882954>','<:magblade:755916820623654912>','<:magDPS:777982060320391219>'],
    sdps: ['<:stamsorc:755916822406103050>','<:stamplar:755916818979356712>','<:stamdk:755916821210595488>','<:stamden:755916810527834202>','<:stamcro:755916821223178260>','<:stamblade:755916818987614218>','<:stamDPS:777982060622905375>'],
    heal: ['<:healsorc:777960536343838760>','<:healplar:777960536159420487>','<:healdk:777960536511217664>','<:healden:777960536335450144>','<:healcro:777960536276467713>','<:healblade:777960536210014239>','<:heal:777982060433375293>'],
    tank: ['<:tanksorc:777960536766808165>','<:tankplar:777960536624201728>','<:tankdk:777960536632983592>','<:tankden:777960536603754546>','<:tankcro:777960536725520454>','<:tankblade:777960536620924949>','<:tank:777982060647415818>'],
    classes: ['sorc','templar','dk','warden','necro','nb','remove'],
    roles: ['<:magDPS:777982060320391219>','<:stamDPS:777982060622905375>','<:heal:777982060433375293>','<:tank:777982060647415818>'],
    maybe: ['<:magMaybe:783814377173155860>','<:stamMaybe:783814376645066793>','<:healMaybe:783814377047982081>','<:tankmaybe:783814377110765578>']
}

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
                .addChoice('Magicka DPS', 'mdps')
                .addChoice('Stamina DPS', 'sdps')
                .addChoice('Healer', 'heal')
                .addChoice('Tank', 'tank')
                .addChoice('Unregister', 'remove'))
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
                msg.edit({embeds: [parseVals(embed,fields)]})
                let output = `${emote} <@${user}> has been signed up!`
                if (role == "remove") {
                    output = `<@${user}> has been removed from the roster!`
                }
                return interaction.reply({ content: output, ephemeral: true })
            })

        })
        
    }
}
