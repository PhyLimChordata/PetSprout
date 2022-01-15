const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let pets = await Pets.findOne({ user: req.user.id });

		const current = pets.currentPet;

		let temp = current;

		const new_Pet = pets.pets.find(
			(pets) => pets._id.toString() === req.params.pet_id.toString(),
		);
		if (!new_Pet) {
			return res.status(404).json({ error: 'Could not find this pet' });
		}

		current.name = new_Pet.name;
		current.level = new_Pet.level;
		current.hp = new_Pet.hp;
		current.expValue = new_Pet.expValue;
		current.image = new_Pet.image;
		current.cosmetics = new_Pet.cosmetics;

		new_Pet.name = temp.name;
		new_Pet.level = temp.level;
		new_Pet.hp = temp.hp;
		new_Pet.expValue = temp.expValue;
		new_Pet.image = temp.image;
		new_Pet.cosmetics = temp.cosmetics;

		await pets.save();
		res.json(current);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
