const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');
const { LevelMapping, evolveLevels } = require('./const');
const { intervalGet } = require('../common/util');

const name = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let usersPet = await Pets.findOne({ user: req.user.id });
		if (req.body.name == '') {
			req.body.name = req.user.userName + "'s Pet";
		}
		usersPet.currentPet.name = req.body.name;
		usersPet.currentPet.image = 'blob';
		usersPet.currentPet.readyToEvolve = false;
		usersPet.currentPet.next_evolution_lvl = intervalGet(
			usersPet.currentPet.next_evolution_lvl + 1,
			'level',
			evolveLevels,
		);
		await usersPet.save();
		res.json(usersPet.currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const customize = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let currentPet = await Pets.findOne({ user: req.user.id }).currentPet;
		currentPet.cosmetics.push(req.cosmetic);
		await currentPet.save();

		res.json(currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const gain_exp = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let usersPet = await Pets.findOne({ user: req.user.id });
		let currentPet = usersPet.currentPet;

		let { exp, level } = changeExp(currentPet.expValue, req.body.expValue);
		currentPet.expValue = exp;
		if (currentPet.level == level - 1) {
			currentPet.hp = currentPet.maxhp
		}
		currentPet.level = level;

		//add this for pet entries which currently exist
		if (!currentPet.next_evolution_lvl) {
			currentPet.next_evolution_lvl = intervalGet(
				currentPet.level,
				'level',
				evolveLevels,
			);
		}

		if (currentPet.level >= currentPet.next_evolution_lvl) {
			currentPet.readyToEvolve = true;
		}

		usersPet.currentPet = currentPet;
		await usersPet.save();

		res.json(currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const changeExp = (prevAmount, changeAmount) => {
	let currentAmount = prevAmount + changeAmount;
	let currentLevel = intervalGet(currentAmount, 'totalXP', LevelMapping);
	return { exp: currentAmount, level: currentLevel };
};

exports.name = name;
exports.customize = customize;
exports.gain_exp = gain_exp;
exports.changeExp = changeExp
