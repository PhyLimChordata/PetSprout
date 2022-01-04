const PomodoroTasks = require('../../schemas/pomodoroTasksSchema');
const User = require('../../schemas/userSchema');

const get_pomodoro_tasks = async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        if (!user) {
            console.log("User not found");
            return res.status(404).json('User could not be found');
        }

        let pomodoroTasks = await PomodoroTasks.findOne({ user: req.user.id });
        if (!pomodoroTasks) {
            let newPomodoro = new PomodoroTasks({
                user: req.user.id,
            })
            await newPomodoro.save();
            pomodoroTasks = newPomodoro;
        }
        let retval = {
            selected_task: pomodoroTasks.selectedTask,
            tasks: pomodoroTasks.pomodoroTasks
        }
        res.status(200).json(retval);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.get_pomodoro_tasks = get_pomodoro_tasks;