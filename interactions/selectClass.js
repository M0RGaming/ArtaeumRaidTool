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

module.exports = {

	id: "class",

	async execute(interaction) {
		let embed = interaction.message.embeds[0]
		let classIndex = emotes.classes.indexOf(interaction.values[0])
		let user = String(interaction.user.id)
		let fields = getVals(embed)

		if (fields.dps.filter(signups => signups[1] == user).length !== 0) {
			let index = fields.dps.findIndex(arr => arr.includes(user))
			let currentEmote = fields.dps[index][0]
			if (emotes.mdps.indexOf(currentEmote) !== -1) {
				fields.dps[index][0] = emotes.mdps[classIndex]
			} else if (emotes.sdps.indexOf(currentEmote) !== -1) {
				fields.dps[index][0] = emotes.sdps[classIndex]
			}
		}
		if (fields.heal.filter(signups => signups[1] == user).length !== 0) {
			let index = fields.heal.findIndex(arr => arr.includes(user))
			fields.heal[index][0] = emotes.heal[classIndex]
		}
		if (fields.tank.filter(signups => signups[1] == user).length !== 0) {
			let index = fields.tank.findIndex(arr => arr.includes(user))
			fields.tank[index][0] = emotes.tank[classIndex]
		}
		if (fields.maybe.filter(signups => signups[1] == user).length !== 0) {
			let index = fields.maybe.findIndex(arr => arr.includes(user))
			fields.maybe[index][0] = emotes.maybe[classIndex]
		}
		if (fields.wait.filter(signups => signups[1] == user).length !== 0) {

			let index = fields.wait.findIndex(arr => arr.includes(user))
			let currentEmote = fields.wait[index][0]
			if (emotes.mdps.indexOf(currentEmote) !== -1) {
				fields.wait[index][0] = emotes.mdps[classIndex]
			} else if (emotes.sdps.indexOf(currentEmote) !== -1) {
				fields.wait[index][0] = emotes.sdps[classIndex]
			} else if (emotes.heal.indexOf(currentEmote) !== -1) {
				fields.wait[index][0] = emotes.heal[classIndex]
			} else if (emotes.tank.indexOf(currentEmote) !== -1) {
				fields.wait[index][0] = emotes.tank[classIndex]
			}
		}

		return interaction.update({embeds: [parseVals(embed,fields)]})

	}



}
