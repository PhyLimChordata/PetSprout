const PomodoroTasks = require('../../schemas/pomodoroTasksSchema');
const User = require('../../schemas/userSchema');

const create_pomodoro_task = async (req, res) => {
    try {
        let { title } = req.body;

        if (title.length == 0) {
            errors.push("Title is empty");
            res.status(400).send(error);
        }

        let user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json({ error: ['User not found']});

        let pomodoroTasks = await PomodoroTasks.findOne({ user: req.user.id });
        if(!pomodoroTasks) {
            let newTasks = new PomodoroTasks({
                user: req.user.id,
            })
            await newTasks.save();
            pomodoroTasks = await PomodoroTasks.findOne({ user: req.user.id });
        }
        let newTask = { title: title };
        pomodoroTasks.pomodoroTasks.push(newTask);
        await pomodoroTasks.save();
        return res.status(200).json(pomodoroTasks.pomodoroTasks);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
};

exports.create_pomodoro_task = create_pomodoro_task;