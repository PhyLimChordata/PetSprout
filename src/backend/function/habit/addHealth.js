const Habit = require('../../schemas/HabitSchema');
const User = require('../../schemas/UserSchema');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let { add_health } = req.body;

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit) return res.status(404).json("User's habit could not found");

		userHabit.health = userHabit.health + add_health;

		await userHabit.save();
		res.json(newHabit);
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};
