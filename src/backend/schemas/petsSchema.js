const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pet = {
	name: {
		type: String,
		default: 'Egg',
	},
	level: {
		type: Number,
		default: 0,
	},
	maxhp: {
		type: Number,
		default: 100,
	},
	hp: {
		type: Number,
		default: 100,
	},
	expValue: {
		type: Number,
		default: 0,
	},
	image: {
		type: String,
		default: 'egg',
	},
	cosmetics: [
		{
			type: String,
		},
	],
	readyToEvolve: {
		type: Boolean,
		default: false,
	},
	readyToHatch: {
		type: Boolean,
		default: false,
	},
	next_evolution_lvl: {
		type: Number,
		default: 5,
	},
};

const PetsSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	currentPet: Pet,
	pets: [Pet],
});

const pets = mongoose.model('pets', PetsSchema);
module.exports = pets;
