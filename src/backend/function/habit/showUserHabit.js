const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');

module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let day = req.params.day;

		let userHabitInfo = await Habit.findOne({ user: req.user.id });
		if (!userHabitInfo)
			return res.status(404).json("User's habits could not found");

		let habitShow = userHabitInfo.habitList.filter(function (habit) {
			return habit.schedule.includes(day);
		});
		//check continuity
		//when its tmr -> new habit - before user logs out send the time
		// if it times out, user should log in again
		let habit = { habitList: habitShow };

		let info = {
			expValue: userHabitInfo.expValue,
			heart: userHabitInfo.heart,
			_id: userHabitInfo._id,
			user: userHabitInfo.user,
		};

		let return_object = extend({}, info, habit);
		res.json(return_object);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function (source) {
		for (var prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}
