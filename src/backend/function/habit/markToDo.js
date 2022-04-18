const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const Pets = require('../../schemas/petsSchema');
const Analyze = require('../../schemas/analyzeSchema');
const { validationResult } = require('express-validator');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Mark todo, modify exp value and return back the user's habit after modification.
 */

module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		//console.log(errors);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let { expValue, date, remainingToLevel } = req.body;

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit) return res.status(404).json("User's habits could not find");

		const habitFromDB = userHabit.habitList.find(
			(habit) => habit._id.toString() === req.params.habit_id.toString(),
		);
		if (!habitFromDB)
			return res.status(404).json("Habit could not find in user's habits");

		habitFromDB.todo = habitFromDB.todo + 1;
		userHabit.expValue = expValue;
		if (habitFromDB.todo === habitFromDB.times) {
			habitFromDB.continuous = habitFromDB.continuous + 1;
			habitFromDB.missing = 0;
			let current = new Date(date);
			current.setHours(0, 0, 0, 0);
			let current_date = current.getDate();
			let current_day = current.getDay();
			// Check the next day onwards for the next sign date
			let index = current_day + 1 > 6 ? 0 : current_day + 1;
			let interval = 1; // can't be today again if the habit has already been finished
			while (!habitFromDB.schedule.includes(index.toString())) {
				if (index === 6) index = 0;
				else index++;

				interval++;
			}
			current.setDate(current_date + interval);
			newSignInDate = new Date(current);
			habitFromDB.nextSignInDate = newSignInDate;
		}
		//Check evolutioon and replenish health
		if (remainingToLevel <= 5) {
			userHabit.heart = 3;
			if (expValue / 100 == 5) {
				//console.log('evolve');
			}
		}
		// await analyze.save();
		await userHabit.save();

		res.json(userHabit);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
