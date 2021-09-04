const Habit = require('../../schemas/HabitSchema');
const User = require('../../schemas/UserSchema');
const Analyze = require('../../schemas/AnalyzeSchema');
const { validationResult } = require('express-validator');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Create a particular habit and return back the newly created habit.
 */
module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let { title, description, reason, schedule, times, alarm, date } =
			req.body;

		let newAnalyze = new Analyze({});
		await newAnalyze.save();

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User not found');

		let userHabit = await Habit.findOne({user:req.user.id});
		if (!userHabit) return res.status(404).json("User's habit information not found");

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
				else index ++;
				interval ++;
			}
			nextSignInDate = current.setDate(current_date + interval);
			nextSignInDate = new Date(nextSignInDate);
		}
	
		let newHabit = {
			analyze: newAnalyze._id,
			title,
			description,
			reason,
			schedule: newSchedule,
			times,
			alarm,
			nextSignInDate
		};

		userHabit.habitList.push(newHabit);
		await userHabit.save();
		res.json(newHabit);

	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};
