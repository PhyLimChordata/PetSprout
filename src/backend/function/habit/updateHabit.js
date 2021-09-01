const Habit = require('../../schemas/HabitSchema');
const User = require('../../schemas/UserSchema');
const { validationResult } = require('express-validator');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Modify a particular habit and return back the habit after modification.
 *
 */

module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit) return res.status(404).json("User's habits could not find");

		const habitFromDB = userHabit.habitList.find(
			(habit) => habit._id.toString() === req.params.habit_id.toString()
		);
		if (!habitFromDB)
			return res.status(404).json("Habit could not find in user's habits");

		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: error.array() });

		let { title, description, reason, schedule, times, alarm } =
			req.body;

		if(schedule === [false,false,false,false,false,false,false]
			|| alarm === [] || times.toString() === '0'){
				return res.status(403).json("Incorrect/Invalid request param");
			}
				
		let newSchedule = [];
		let i = 0;
		for (const element of schedule) {
			if (element === true) newSchedule.push(i.toString());
			i++;
		 }

		habitFromDB.title = title;
		habitFromDB.description = description;
		habitFromDB.reason = reason;
		habitFromDB.schedule = newSchedule;
		habitFromDB.times = times;
		habitFromDB.alarm = alarm;

		await userHabit.save();
		res.json(habitFromDB);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
