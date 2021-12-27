const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HabitSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		expValue: {
			type: Number,
			default: 0,
		},
		heart: {
			type: Number,
			default: 3,
		},
		habitList: [
			{
				analyze: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'analyze',
				},
				title: {
					type: String,
				},
				description: {
					type: String,
					default: '',
				},
				reason: {
					type: String,
					default: '',
				},
				schedule: {
					type: [String],
				},
				times: {
					type: String,
				},
				alarm: {
					type: [Date],
				},
				date: {
					type: Date,
					default: Date.now(),
				},
				todo: {
					type: Number,
					default: 0,
				},
				continuous: {
					type: Number,
					default: 0,
				},
				missing: {
					type: Number,
					default: 0,
				},
				nextSignInDate: {
					type: Date,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

const habitSchema = mongoose.model('habit', HabitSchema);
module.exports = habitSchema;
