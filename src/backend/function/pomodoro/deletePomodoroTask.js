const PomodoroTasks = require('../../schemas/pomodoroTasksSchema');
const User = require('../../schemas/userSchema');

const delete_pomodoro_task = async (req, res) => {
    try {
        let taskId = req.params.task_id;

        let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User not found');

        let pomodoroTasks = await PomodoroTasks.findOne({ user: req.user.id });
        if(!pomodoroTasks) return res.status(404).json("User has no pomodoro tasks.");

        let selectedTask = pomodoroTasks.pomodoroTasks.findIndex(task => task.id === taskId)
        if(selectedTask == -1) {
            return res.status(404).json('Task does not exist in user task list');
        } else {
            if(pomodoroTasks.selectedTask.id == taskId) pomodoroTasks.selectedTask = null;
            pomodoroTasks.pomodoroTasks.splice(selectedTask, 1);
        }
        await pomodoroTasks.save();
        return res.status(200).json("Deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
};

exports.delete_pomodoro_task = delete_pomodoro_task;