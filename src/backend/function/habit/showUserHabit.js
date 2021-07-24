const Habit = require('../../schemas/HabitSchema');
const User = require('../../schemas/UserSchema');

module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userHabit = await Habit.findOne({ user: req.user.id });
		if (!userHabit)
			return res.status(404).json("User's habits could not found");

		res.json(userHabit);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
