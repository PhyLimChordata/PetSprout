const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');
const updatePet = require('./updatePet');

const { validationResult } = require('express-validator');

const revivePet = async (req, res) => {
	try {
		let usersPet = await Pets.findOne({ user: req.user.id });

		if (isDead(usersPet.currentPet)) {
			usersPet.currentPet.hp = restoreHp(usersPet.currentPet.hp, usersPet.currentPet.maxhp / 2);
			let { exp, level } = updatePet.changeExp(
				usersPet.currentPet.expValue,
				-(usersPet.currentPet.expValue / 2),
			);
			usersPet.currentPet.expValue = exp;
			usersPet.currentPet.level = level;
			await usersPet.save();
			res.json(usersPet.currentPet);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json(`error in revive ${JSON.stringify(error)}`);
	}
};

const isDead = (pet) => {
	return pet.hp <= 0;
};

const restoreHp = (prevAmount, restoreAmount) => {
	let currentAmount = prevAmount + restoreAmount;
	if (currentAmount > 100) {
		currentAmount = 100;
	}
	return currentAmount;
};

const addHealth = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let currentPet = await Pets.findOne({ user: req.user.id }).currentPet;
		currentPet.hp = restoreHp(currentPet.hp, req.hp);
		await currentPet.save();

		res.json(currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const loseHealth = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let currentPet = await Pets.findOne({ user: req.user.id }).currentPet;
		currentPet.hp = currentPet.hp - req.hp;
		if (currentPet.hp < 0) {
			currentPet.hp = 0;
		}
		await currentPet.save();

		res.json(currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

exports.addHealth = addHealth;
exports.loseHealth = loseHealth;
exports.revivePet = revivePet;
