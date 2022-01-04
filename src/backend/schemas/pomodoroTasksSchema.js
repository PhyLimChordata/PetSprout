const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PomodoroTasksSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        selectedTask: {
            id : {
                type: mongoose.Schema.Types.ObjectId
            },
            title: {
                type: String,
            }
        },
        pomodoroTasks: [
            {
                title: {
                    type: String,
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const pomodoroTasksSchema = mongoose.model('pomodoroTasks', PomodoroTasksSchema);
module.exports = pomodoroTasksSchema;