const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');

module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit) return res.status(404).json("User's habits could not find");

		var habitFromDB = userHabit.habitList.find(
			(habit) => habit._id.toString() === req.params.habit_id.toString(),
		);
		if (!habitFromDB)
			return res.status(404).json("Habit could not find in user's habits");

		/* Unpackage list of alarms. Pretty bad hack. */
		alarm_list = []
		for (const a in habitFromDB.alarm) {
			alarm_list.push(habitFromDB.alarm[a].date)
		}

		let habitFromDBCopy = {
			analyze: habitFromDB.analyze,
			title: habitFromDB.title,
			description: habitFromDB.description,
			reason: habitFromDB.reason,
			schedule: habitFromDB.schedule,
			times: habitFromDB.times,
			alarm: alarm_list,
			date: habitFromDB.date,
			todo: habitFromDB.todo,
			continuous: habitFromDB.continuous,
			nextSignInDate: habitFromDB.nextSignInDate
		}

		res.json(habitFromDBCopy);

	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
