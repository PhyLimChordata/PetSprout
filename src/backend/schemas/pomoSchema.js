const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PomoSchema = new Schema({
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
    pomoList: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
                default: '',
            },
            todo: {
                type: Number,
                default: 0,
            },
        }
    ]



}
)
const pomoSchema = mongoose.model('pomo', PomoSchema);
module.exports = pomoSchema;