const Habit = require('../../schemas/HabitSchemas');
const User = require('../../schemas/UserSchemas');
const Analyze = require('../../schemas/AnalyzeSchemas');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Delete a particular habit and return back user's habit.
 */
module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit) return res.status(404).json("User's habits could not find");

		const deleteHabitList = userHabit.habitList.filter(
			(habit) => habit._id.toString() === req.params.habit_id.toString()
		);

		let analyzeId = deleteHabitList[0].analyze;

		await Analyze.findByIdAndDelete(analyzeId);

		const habitFromDB = userHabit.habitList.filter(
			(habit) => habit._id.toString() !== req.params.habit_id.toString()
		);
		userHabit.habitList = habitFromDB;
		await userHabit.save();
		res.json(userHabit);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
