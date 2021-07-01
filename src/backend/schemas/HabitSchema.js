const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HabitSchema = new Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    expValue: {
        type: Number,
        default: 0
    },
    heart: {
        type: Number,
        default: 3,
        max: 3
    },
    habitList: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
                default:""
            },
            reason: {
                type: String,
                default:""
            },
            schedule: {
                type: String
            },
            repeat: {
                type: String
            },
            times: {
                type: String
            },
            alarm: {
                type: String
            },
            tag: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            },
            todo: {
                type: Number,
                default: 0
            }
        }
    ]
  }, {
    timestamps: true 
});

const habitSchema = mongoose.model("habit", HabitSchema);
module.exports = habitSchema;