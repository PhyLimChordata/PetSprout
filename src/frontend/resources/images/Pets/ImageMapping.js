export const ImageMapping = {
	anglerfish: require('./anglerfish/anglerfish'),
	anteater: require('./anteater/anteater'),
	armadillo: require('./armadillo/armadillo'),
	bat: require('./bat/bat'),
	blob: require('./blob/blob'),
	bear: require('./bear/bear'),
	betafish: require('./betafish/betafish'),
	biblicalangel: require('./biblicalangel/biblicalangel'),
	bird: require('./bird/bird'),
	butterfly: require('./butterfly/butterfly'),
	eel: require('./eel/eel'),
	egg: require('./Egg/Egg'),
	elephant: require('./elephant/elephant'),
	finny: require('./fin/fin'),
	flyingfish: require('./flyingfish/flyingfish'),
	flyingsquirrel: require('./flyingsquirrel/flyingsquirrel'),
	frilledlizard: require('./frilledlizard/frilledlizard'),
	griffin: require('./griffin/griffin'),
	hydra: require('./hydra/hydra'),
	kangaroo: require('./kangaroo/kangaroo'),
	toeny: require('./legs/legs'),
	lionfish: require('./lionfish/lionfish'),
	mantaray: require('./mantaray/mantaray'),
	meerkat: require('./meerkat/meerkat'),
	multiwing: require('./multiwing/multiwing'),
	pangolin: require('./pangolin/pangolin'),
	pegasus: require('./pegasus/pegasus'),
	phoenix: require('./phoenix/phoenix'),
	piranha: require('./piranha/piranha'),
	pufferfish: require('./pufferfish/pufferfish'),
	redpanda: require('./redpanda/redpanda'),
	rhino: require('./rhino/rhino'),
	seahorse: require('./seahorse/seahorse'),
	shark: require('./shark/shark'),
	snake: require('./snake/snake'),
	swordfish: require('./swordfish/swordfish'),
	tapir: require('./tapir/tapir'),
	tortoise: require('./tortoise/tortoise'),
	turtle: require('./turtle/turtle'),
	wingin: require('./wing/wing'),
	wyvern: require('./wyvern/wyvern'),
}

export function getImage(name, status, colour) {
	let petName = name.toLowerCase().replace(/\s/g, '');
	// console.log(name.toLowerCase())
	if(typeof ImageMapping[petName][petName][status][colour] == "undefined") {
		console.log(`ImageMapping: Getting ${status} ${colour} ${petName} but returned undefined.`)
		return ImageMapping['egg']['egg']['Happy']['Green']
	} else {
		// console.log(`ImageMapping: Getting ${status} ${colour} ${petName}.`)
		return ImageMapping[petName][petName][status][colour]
	}
}
