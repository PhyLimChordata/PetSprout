const PomodoroTasks = require('../../schemas/pomodoroTasksSchema');
const User = require('../../schemas/userSchema');

const select_pomodoro_task = async (req, res) => {
    try {
        let taskId = req.params.task_id;

        let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User not found');

        let pomodoroTasks = await PomodoroTasks.findOne({ user: req.user.id });
        if(!pomodoroTasks) return res.status(404).json("User has no pomodoro tasks.");

        let selectedTask = pomodoroTasks.pomodoroTasks.find(task => task.id === taskId)
        if(typeof selectedTask === 'undefined') {
            return res.status(404).json('Task does not exist in user task list');
        } else {
            selected = {
                title : selectedTask.title,
                id : selectedTask.id
            }
            pomodoroTasks.selectedTask = selected;
            await pomodoroTasks.save();
        }
        return res.status(200).json(selected);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
};

exports.select_pomodoro_task = select_pomodoro_task;