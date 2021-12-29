const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');

const evolveCheck = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let currentPet = await Pets.findOne({ user: req.user.id }).currentPet;
		res.json(currentPet.readyToEvolve);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const evolvePet = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let currentPet = await Pets.findOne({ user: req.user.id }).currentPet;
		if (!currentPet.readyToEvolve) {
			return;
		}
		currentPet.name = req.name;
		currentPet.image = req.image;
		currentPet.hp = 100;
		currentPet.readyToEvolve = false;
		await currentPet.save();

		res.json(currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

exports.evolve = evolvePet;
exports.evolveCheck = evolveCheck;