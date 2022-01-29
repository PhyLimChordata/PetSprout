const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');

const revivePet = async (req, res) => {
	currentPet = undefined;
	try {
		currentPet = await Pets.findOne({ user: req.user.id }).currentPet;
		if (isDead(currentPet)) {
			currentPet.hp = restoreHp(currentPet.hp, currentPet.maxhp / 2);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json(`error in revive ${JSON.stringify(error)}`);
	}
};

const isDead = async (pet) => {
	return pet.hp <= 0;
};

const restoreHp = async (prevAmount, restoreAmount) => {
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
