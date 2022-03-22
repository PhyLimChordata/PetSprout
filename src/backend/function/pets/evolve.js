const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');
const Achievements = require('../../schemas/achievementSchema');

const { validationResult } = require('express-validator');
const { intervalGet } = require('../common/util');
const { evolveLevels } = require('./const');

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

		let usersPet = await Pets.findOne({ user: req.user.id });
		let currentPet = usersPet.currentPet;
		if (!currentPet.readyToEvolve) {
			return;
		}

		// update caretaker count everytime a pet evolves/hatches
		let userAchievements = await Achievements.findOne({ user: req.user.id });
		if (userAchievements) {
			userAchievements.achievements.habipet.caretaker++;
			await userAchievements.save();
		} else {
			console.log('No achievements found for user with id ' + req.user.id);
		}

		currentPet.image = req.body.name;
		currentPet.hp = 100;
		currentPet.readyToEvolve = false;

		currentPet.next_evolution_lvl = intervalGet(
			currentPet.next_evolution_lvl + 1,
			'level',
			evolveLevels,
		);

		await usersPet.save();
		res.json(currentPet);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

exports.evolve = evolvePet;
exports.evolveCheck = evolveCheck;
