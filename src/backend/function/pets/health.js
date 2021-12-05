const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');

const addHealth = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let currentPet = await Pets.findOne({user: req.user.id}).currentPet;
        currentPet.hp = currentPet.hp + req.hp;
        if (currentPet.hp > 100) {
            currentPet.hp = 100;
        }
        await currentPet.save();

        res.json(currentPet);
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}


const loseHealth = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let currentPet = await Pets.findOne({user: req.user.id}).currentPet;
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
}

const getHealth = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        console.log(req.user.id);
        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        console.log(user.id);

        let usersPet = await Pets.findOne({user: user.id});
        res.json(usersPet.currentPet.hp);
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}
exports.addHealth = addHealth;
exports.loseHealth = loseHealth;
