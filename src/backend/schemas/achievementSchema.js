const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	achievements: [
		{
			category: {
				type: String,
			},
			subachievements: [
				{
					name: {
						type: String,
						default: '',
					},
					progress: {
						type: Number,
						default: 0,
					},
				},
			],
		},
	],
});

const achievement = mongoose.model('achievement', AchievementSchema);
module.exports = achievement;
