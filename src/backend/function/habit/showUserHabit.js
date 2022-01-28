const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');

const masteryDays = 66
module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let date = req.params.day;
		let userHabitInfo = await Habit.findOne({ user: req.user.id });
		if (!userHabitInfo)
			return res.status(404).json("HABITS: User's habits could not found");

		let today = new Date(date);
		console.log(today)
		today.setHours(0, 0, 0, 0);
		let day = today.getDay();
		let user_last_login = user.lastlogin;
		user_last_login.setHours(0, 0, 0, 0);

		// Filtering out habits to be shown
		let habitShow = userHabitInfo.habitList.filter(function (habit) {
			return habit.schedule.includes(day);
		});

		// Sort habit by frequency (number of times that they still need to
		// copmplete the habit by)
		habitShow.sort((a, b) => (b.times - b.todo) - (a.times - a.todo));

		let miss = userHabitInfo.habitList.filter(function (habit) {
			return habit.missing > 0 && habit.schedule.includes(day);
		});
		// checks if any habit has been missed twice or more (display notification)
		let twice = userHabitInfo.habitList.filter(function (habit) {
			return habit.missing > 1;
		});

		// Sort missed habits in a way that if it is missed for once it will
		// show up first in the list, otherwise order in descending order.
		miss.sort((a,b) => {
			if(b.missing === a.missing && b.missing === 1) {
				return 0
			} else if (a.missing === 1) {
				return -1
			} else if (b.missing === 1) {
				return 1;
			} else {
				return b.missing - a.missing
			}
		});

		let mastered = userHabitInfo.habitList.filter(function (habit) {
			return habit.continuous == masteryDays;
		})

		let habit = { habitList: habitShow };
		let missing_habits = { missing_habits: miss};
		let mastered_habits = { mastered_habits: mastered};
		let missed_twice = { missed_twice: twice};

		let info = {
			expValue: userHabitInfo.expValue,
			heart: userHabitInfo.heart,
			_id: userHabitInfo._id, 
			user: userHabitInfo.user,
		};

		let return_object_1 = extend({}, info, habit);
		let return_object_2 = extend({}, return_object_1, missing_habits);
		let return_object_3 = extend({}, return_object_2, missed_twice);
		let return_object = extend({}, return_object_3, mastered_habits);

		return res.status(200).json(return_object);
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
