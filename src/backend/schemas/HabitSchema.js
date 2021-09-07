const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema(
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
					ref: 'analyze'
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
			},
		],
	},
	{
		timestamps: true,
	}
);

const habitSchema = mongoose.model('habit', habitSchema);
module.exports = habitSchema;


