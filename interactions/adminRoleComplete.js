const { parseVals, getVals } = require('../commonFunctions.js')

const emotes = {
    mdps: "<:magDPS:777982060320391219>",
    sdps: "<:stamDPS:777982060622905375>",
    heal: "<:heal:777982060433375293>",
    tank: "<:tank:777982060647415818>"
}

module.exports = {

    id: "adminEditRole",

    async execute(interaction) {
        let userRoles = interaction.member._roles


        let embed = interaction.message.embeds[0]
        let user = String(interaction.user.id)

        if (embed.fields.length > 7) {
            let prereqText = embed.fields[7].value
            let findRoles = /<@&(.*?)>/g;
            let found = prereqText.matchAll(findRoles);
            let fillsPrereq = false
            for (const match of found) {
                if (userRoles.indexOf(match[1]) !== -1) {
                    fillsPrereq = true
                }
            }
            if (!fillsPrereq) {
                return interaction.reply({
                    content: `Sorry <@${user}>, you do not have the prerequisite roles to sign up for this raid!`,
                    ephemeral: true
                })
            }
        }



        //let fields = embed.fields //DPS = 1; Healer = 2; Tank = 3
        let emote = emotes[interaction.values[0]]
        let fields = getVals(embed)
        //return interaction.reply({ content: `User ${user} has selected ${emote} in message ${interaction.message.id}`, ephemeral: true })
        if (interaction.values[0] == "mdps" || interaction.values[0] == "sdps") {


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

            //remove via out.filter(word => word[1] !== '161614687321063434');
            //console.log(fields)


        } else if (interaction.values[0] == "heal") {
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
        } else if (interaction.values[0] == "tank") {
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
        } else if (interaction.values[0] == "remove") {
            fields.dps = fields.dps.filter(signups => signups[1] !== user);
            fields.heal = fields.heal.filter(signups => signups[1] !== user);
            fields.tank = fields.tank.filter(signups => signups[1] !== user);
            fields.maybe = fields.maybe.filter(signups => signups[1] !== user);
            fields.wait = fields.wait.filter(signups => signups[1] !== user);
        }


        return interaction.update({embeds: [parseVals(embed,fields)]})

    }



}
