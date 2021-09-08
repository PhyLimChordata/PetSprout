const Habit = require('../../schemas/HabitSchemas');
const User = require('../../schemas/UserSchemas');
const Analyze = require('../../schemas/AnalyzeSchemas');

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

		let { title, description, reason, schedule, times, alarm } = req.body;

		let newAnalyze = new Analyze({});
		await newAnalyze.save();

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User not found');

		let userHabit = await Habit.findOne({ user: req.user.id });
		if (!userHabit)
			return res.status(404).json("User's habit information not found");

		if (
			schedule === [false, false, false, false, false, false, false] ||
			alarm === [] ||
			times.toString() === '0'
		) {
			return res.status(403).json('Incorrect/Invalid request param');
		}

		let newSchedule = [];
		let i = 0;
		for (const element of schedule) {
			if (element === true) newSchedule.push(i.toString());
			i++;
		}

		let newHabit = {
			analyze: newAnalyze._id,
			title,
			description,
			reason,
			schedule: newSchedule,
			times,
			alarm,
		};

		userHabit.habitList.push(newHabit);
		await userHabit.save();
		res.json(newHabit);
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};
