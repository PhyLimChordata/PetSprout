const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema (
	{
        user_id: {
            type: Schema.Types.ObjectId,
            require: true
        },
		did_accept_terms: {
			type: Boolean,
			required: true,
			default: false,
		},
		did_accept_policy: {
			type: Boolean,
			required: true,
			default: false,
		},
	}
);

const document = mongoose.model('document', documentSchema);
module.exports = document;
