const Habit = require('../../schemas/HabitSchemas');
const User = require('../../schemas/UserSchemas');

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

		res.json(habitFromDB);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
