const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema(
	{
        user_id: {
            type: ObjectId,
            require: true
        },
		did_accept_terms: {
			type: Boolean,
			require: true,
			default: false,
		},
		did_accept_policy: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const document = mongoose.model('document', documentSchema);
module.exports = document;
