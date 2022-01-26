const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');
const missedHabitPunishment = -10; // Health lost per time habit is missed.


const addHealth = async (req, res) => {
	res = modifyHealth(req.user.id, req.body.hp, res);
	return res;
}

const loseHealth = async (req, res) => {
	res = modifyHealth(req.user.id, -req.body.hp, res);
	return res;
};

const missedStreaksHealthLoss = async (numHabitsMissed) => {
	try {
		console.log(`Health Lossed: ${missedHabitPunishment * numHabitsMissed}`)
		return modifyHealth(missedHabitPunishment * numHabitsMissed);
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
}

/*
	Change health value by 'healthChange'.
*/
const modifyHealth = async (id, healthChange, res) => {
	try {
		// Find user
		let user = await User.findById(id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		// Find associated pet
		let petQuery = await Pets.findOne({ user: id })
		if (!petQuery) return res.status(404).json('Pet could not found');
		currentPet = petQuery.currentPet;
		currentPet.hp = currentPet.hp + healthChange;
		
		// Ensure 0 <= health <= 100
		if (currentPet.hp < 0) {
			currentPet.hp = 0;
		}
		if (currentPet.hp > 100) {
			currentPet.hp = 100;
		}
		
		// Update pet health
		await petQuery.save();
		return res.json(currentPet);

	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
}

exports.addHealth = addHealth;
exports.loseHealth = loseHealth;
exports.missedStreaksHealthLoss = missedStreaksHealthLoss;
