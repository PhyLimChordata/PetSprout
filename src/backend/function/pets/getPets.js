const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');

const get_current = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let usersPet = await Pets.findOne({user: req.user.id});
        
        res.json(usersPet.currentPet);
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}


const get_all = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let pets = await Pets.findOne({user: req.user.id});
        let benched_pets = pets.pets;
        let current_pet = pets.currentPet;      
        res.json({current_pet, benched_pets});
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}

exports.get_current = get_current;
exports.get_all = get_all;
