const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		themeColor: {
			type: String,
			require: true,
			default: 'green',
		},
		mode: {
			type: String,
			require: true,
			default: 'Day',
		},
		pushNotification: {
			type: Boolean,
			require: true,
			default: false,
		},
		emailNotification: {
			type: Boolean,
			require: true,
			default: false,
		},
		voiceNotification: {
			type: Boolean,
			require: true,
			default: false,
		},
		vibration: {
			type: Boolean,
			require: true,
			default: false,
		},
		reminder: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const settingSchema = mongoose.model('setting', SettingSchema);
module.exports = settingSchema;
