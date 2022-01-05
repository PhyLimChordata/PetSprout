const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetsSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	currentPet: {
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
			default: 'Egg',
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
	},
	pets: [
		{
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
				default: 'Egg',
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
		},
	],
});

const pets = mongoose.model('pets', PetsSchema);
module.exports = pets;
