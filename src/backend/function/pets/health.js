const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');
const updatePet = require('./updatePet');

const { validationResult } = require('express-validator');
const missedHabitPunishment = -10; // Health lost per time habit is missed.

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
	let ret = modifyHealth(req.user.id, req.body.hp, res);
	res.status(ret.status).json(ret.message);
}

const loseHealth = async (req, res) => {
	let ret = modifyHealth(req.user.id, -req.body.hp, res);
	res.status(ret.status).json(ret.message);
}

const missedStreaksHealthLoss = async (id, numHabitsMissed, ) => {
	try {
		return modifyHealth(id, missedHabitPunishment * numHabitsMissed);
	} catch (error) {
		console.error(error);
		return error;
	}
}

/*
	Change health value by 'healthChange'.
*/
const modifyHealth = async (id, healthChange) => {
	try {
		// Find user
		let user = await User.findById(id).select('-password');
		if (!user) return {"status": 404,
						   "message": "User could not be found."}

		// Find associated pet
		let petQuery = await Pets.findOne({ user: id })
		if (!petQuery) return {"status": 404,
						       "message": "Pet could not found."}
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
		return {"status": 200,
				"message": `Updated pet health by ${healthChange}`,
				"currentPet": currentPet}

	} catch (error) {
		console.error(error);
		return {"status": 500,
				"message": "Server Error"}
	}
}

exports.addHealth = addHealth;
exports.loseHealth = loseHealth;
exports.revivePet = revivePet;
exports.missedStreaksHealthLoss = missedStreaksHealthLoss;
