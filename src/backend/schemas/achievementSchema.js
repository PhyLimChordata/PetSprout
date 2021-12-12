const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	achievements: {
		streaks: {
			longest_streak: {
				type: Number,
				default: 0,
			},
			habits_with_streaks: {
				type: Number,
				default: 0,
			},
		},
		creature: {
			evolution_stages: {
				type: Number,
				default: 0,
			},
			highest_level: {
				type: Number,
				default: 0,
			},
			cosmetics_num: {
				type: Number,
				default: 0,
			},
			pets_num: {
				type: Number,
				default: 0,
			},
		},
		accountability: {
			days_alive: {
				type: Number,
				default: 0,
			},
			login_streak: {
				type: Number,
				default: 0,
			},
			friends_number: {
				type: Number,
				default: 0,
			},
			friends_helped: {
				type: Number,
				default: 0,
			},
		},
	},
});

const achievement = mongoose.model('achievement', AchievementSchema);
module.exports = achievement;
