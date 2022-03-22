const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		status: {
			type: Number,
			required: true,
		},
		pending_password: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			default: '',
		},
		lastlogin: {
			type: Date,
		},
		timezone: {
			type: String,
		},
		//TODO: Store a metadata like a version number, timestamp, IP etc
		termsAndAgreements: {
			type: Boolean,
		},
		tokens: [
			{
				expoPushToken: {
					type: String,
					unique: false
				}
			}
		]
	},
	{
		timestamps: true,
	},
);

const userSchema = mongoose.model('user', UserSchema);
module.exports = userSchema;
