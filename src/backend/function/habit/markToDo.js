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
		console.log(errors);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let { expValue, date, remainingToLevel } = req.body;

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

				// Pets.findById(user.id)

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit) return res.status(404).json("User's habits could not find");

		const habitFromDB = userHabit.habitList.find(
			(habit) => habit._id.toString() === req.params.habit_id.toString(),
		);
		if (!habitFromDB)
			return res.status(404).json("Habit could not find in user's habits");

		habitFromDB.todo = habitFromDB.todo + 1;
		console.log(userHabit.expValue);
		userHabit.expValue = expValue;
		console.log(expValue);

		if (habitFromDB.todo === habitFromDB.times) {
			habitFromDB.continuous = habitFromDB.continuous + 1;
			let current = new Date(date);
			let current_date = current.getDate();
			let current_day = current.getDay();
			let nextSignInDate = null;
			if (newSchedule.includes(current_day.toString())) {
				nextSignInDate = current;
			} else {
				let index = current_day;
				let interval = 0;
				while (!newSchedule.includes(index.toString())) {
					if (index === 6) index = 0;
					else index++;
					interval++;
				}
				nextSignInDate = current.setDate(current_date + interval);
				nextSignInDate = new Date(nextSignInDate);
			}
		}

		// let anaylzeId = habitFromDB.analyze;
		// let analyze = await Analyze.findById(anaylzeId);
		// if (!analyze) return res.status(404).json("User habit's analyze not found");

		// // need to change to user time
		// // const date = new Date();

		// let analyze_data = analyze.freq.find(
		// 	(data) =>
		// 		data.date.getFullYear().toString() === date.getFullYear().toString() &&
		// 		data.date.getMonth().toString() === date.getMonth().toString() &&
		// 		data.date.getDate().toString() === date.getDate().toString(),
		// );
		// if (!analyze_data) {
		// 	let newData = {
		// 		date: date,
		// 		frequency: 1,
		// 	};
		// 	analyze.freq.push(newData);
		// } else {
		// 	analyze_data.freq = analyze_data.freq + 1;
		// }

		//Check evolutioon and replenish health
		if (remainingToLevel <= 5) {
			userHabit.heart = 3;
			if (expValue / 100 == 5) {
				console.log('evolve');
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
