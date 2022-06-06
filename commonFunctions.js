module.exports.getVals = (embed) => {
    let out = {}
    let regexIn = /(❓|⌛|.*?) <@(.*?)>/gm
    let regexOut = '$1 $2'
    out.dps = embed.fields[1].value.replace('\u200b','').replace(regexIn,regexOut).split('\n').map(x => x.split(" "))
    out.heal = embed.fields[2].value.replace('\u200b','').replace(regexIn,regexOut).split('\n').map(x => x.split(" "))
    out.tank = embed.fields[3].value.replace('\u200b','').replace(regexIn,regexOut).split('\n').map(x => x.split(" "))
    out.maybe = embed.fields[5].value.replace('\u200b','').replace(regexIn,regexOut).split('\n').map(x => x.split(" "))
    out.wait = embed.fields[6].value.replace('\u200b','').replace(regexIn,regexOut).split('\n').map(x => x.split(" "))
    for (let x in out) {
        if (out[x].length == 1 && out[x][0] == '') {
            out[x] = []
        }
    }

    //console.log(out)
    // if out.field.length == 3, and out[field][2] == 🔕, then the user has opted out of pings.


    let parseLims = (field) => {
        let currentField = embed.fields[field].name
        if (currentField.includes('/')) {
            return Number(currentField.split('/')[1].replace(')',''))
        }
        else {
            return 0
        }
    }

    out.dpsLim = parseLims(1)
    out.healLim = parseLims(2)
    out.tankLim = parseLims(3)



    return out
}


module.exports.parseVals = (embed, vals) => {
    let fields = embed.fields
    fields[1].value = vals.dps.map(x => `${x[0]} <@${x[1]}>`).join('\n')
    fields[2].value = vals.heal.map(x => `${x[0]} <@${x[1]}>`).join('\n')
    fields[3].value = vals.tank.map(x => `${x[0]} <@${x[1]}>`).join('\n')
    fields[5].value = vals.maybe.map(x => `${x[0]} <@${x[1]}>`).join('\n')
    fields[6].value = vals.wait.map(x => `${x[0]} <@${x[1]}>`).join('\n')

    fields[1].name = (vals.dpsLim !== 0) ? `DPS (${vals.dps.length}/${vals.dpsLim})` : `DPS (${vals.dps.length})`
    fields[2].name = (vals.healLim !== 0) ? `Healers (${vals.heal.length}/${vals.healLim})` : `Healers (${vals.heal.length})`
    fields[3].name = (vals.tankLim !== 0) ? `Tanks (${vals.tank.length}/${vals.tankLim})` : `Tanks (${vals.tank.length})`
    fields[5].name = `Maybe (${vals.maybe.length})`
    fields[6].name = `Wait List (${vals.wait.length})`
    // edit name here

    for (let x of fields) {
        if (x.value == '') x.value = '\u200b';
    }
    embed.setFields(fields)
    return embed
}
