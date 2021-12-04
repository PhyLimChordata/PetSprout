const Pets = require('../../schemas/petsSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');

const name = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let currentPet = await Pets.findOne({user: req.user.id}).currentPet;
        currentPet.name = req.name;
        await currentPet.save();
        res.json(currentPet);
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}

const customize = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let currentPet = await Pets.findOne({user: req.user.id}).currentPet;
        currentPet.cosmetics.push(req.cosmetic);
        await currentPet.save();
        
        res.json(currentPet);
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}

const gain_exp = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

        let user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json('User could not found');

        let currentPet = await Pets.findOne({user: req.user.id}).currentPet;
        currentPet.expValue = currentPet.expValue + req.expValue;

        if (req.expToLevelNext < currentPet.expValue) {
            currentPet.level += 1;
        }

        if (currentPet.level === req.levelToEvolveNext) {
            currentPet.readyToEvolve = true;
        }
        await currentPet.save(); 
        
        res.json(currentPet);
    } catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
}

exports.name = name;
exports.customize = customize;
exports.gain_exp = gain_exp;
