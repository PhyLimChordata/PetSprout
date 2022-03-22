const LevelMapping = {
	0: { xpLevelCap: 100, totalXP: 100 },
	1: { xpLevelCap: 400, totalXP: 500 },
	2: { xpLevelCap: 725, totalXP: 1225 },
	3: { xpLevelCap: 950, totalXP: 2175 },
	4: { xpLevelCap: 1175, totalXP: 3350 },
	5: { xpLevelCap: 1400, totalXP: 4750 },
	6: { xpLevelCap: 1625, totalXP: 6375 },
	7: { xpLevelCap: 1850, totalXP: 8225 },
	8: { xpLevelCap: 2075, totalXP: 10300 },
	9: { xpLevelCap: 2300, totalXP: 12600 },
	10: { xpLevelCap: 2525, totalXP: 15125 },
	11: { xpLevelCap: 2575, totalXP: 17700 },
	12: { xpLevelCap: 2625, totalXP: 20325 },
	13: { xpLevelCap: 2675, totalXP: 23000 },
	14: { xpLevelCap: 2725, totalXP: 25725 },
	15: { xpLevelCap: 2775, totalXP: 28500 },
	16: { xpLevelCap: 2825, totalXP: 31325 },
	17: { xpLevelCap: 2875, totalXP: 34200 },
	18: { xpLevelCap: 2925, totalXP: 37125 },
	19: { xpLevelCap: 2975, totalXP: 40100 },
	20: { xpLevelCap: 3025, totalXP: 43125 },
	21: { xpLevelCap: 3100, totalXP: 46225 },
	22: { xpLevelCap: 3150, totalXP: 49375 },
	23: { xpLevelCap: 3200, totalXP: 52575 },
	24: { xpLevelCap: 3250, totalXP: 55825 },
	25: { xpLevelCap: 3300, totalXP: 59125 },
	26: { xpLevelCap: 3350, totalXP: 62475 },
	27: { xpLevelCap: 3400, totalXP: 65875 },
	28: { xpLevelCap: 3450, totalXP: 69325 },
	29: { xpLevelCap: 3500, totalXP: 72825 },
	30: { xpLevelCap: 3550, totalXP: 76375 },
	31: { xpLevelCap: 3600, totalXP: 79975 },
	32: { xpLevelCap: 3650, totalXP: 83625 },
	33: { xpLevelCap: 3700, totalXP: 87325 },
	34: { xpLevelCap: 3750, totalXP: 91075 },
	35: { xpLevelCap: 3800, totalXP: 94875 },
	36: { xpLevelCap: 3850, totalXP: 98725 },
	37: { xpLevelCap: 3900, totalXP: 102625 },
	38: { xpLevelCap: 3950, totalXP: 106575 },
	39: { xpLevelCap: 4000, totalXP: 110575 },
	40: { xpLevelCap: 4050, totalXP: 114625 },
};

const evolveLevels = {
	5: { level: 5 },
	10: { level: 10 },
	20: { level: 20 },
	30: { level: 30 },
};

const isFullyEvolved = (next_evolution_level,level) => {
	let evokeys = Object.keys(evolveLevels);
	let finalEvolutionLevel = evokeys[evokeys.length-1];
	return next_evolution_level >= finalEvolutionLevel && level > finalEvolutionLevel
}
exports.LevelMapping = LevelMapping;
exports.evolveLevels = evolveLevels;
exports.isFullyEvolved = isFullyEvolved;
