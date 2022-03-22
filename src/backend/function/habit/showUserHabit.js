const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const HabitDAO = require('./habitsDAO')
const UserDAO = require('../user/userDAO')

const { DateTime } = require("luxon");
const { parseDateTime } = require("../common/time.js");

const masteryDays = 66;
module.exports = async (req, res) => {
	try {
		// Get user
		let userResult = await UserDAO.getUser(req.user.id)
		if (userResult.msg != "success") {
			console.log(userResult.msg)
			return res.status(userResult.code).json(userResult.msg)
		}
		let user = userResult.result

		// Get user habits
		let getHabitsResults = await HabitDAO.getHabits(user._id)
		if(getHabitsResults.msg != "success") {
			return res.status(getHabitsResults.code).json(getHabitsResults.msg)
		}
		let userHabitInfo = getHabitsResults.result

		let currentTime=parseDateTime(req.params.day, user.timezone);
		
		// Luxon DateTime weekday: 1 = Monday, 7 = Sunday, we want 0 = Sunday
		let day = currentTime.weekday === 7 ? 0 : currentTime.weekday;

		// Filtering out habits to be shown
		let habitShow = userHabitInfo.habitList.filter(
			function (habit) {
				return habit.schedule.includes(day);
			}
		);

		// Sort habit by frequency (number of times that they still need to
		// copmplete the habit by)
		habitShow.sort((a, b) => b.times - b.todo - (a.times - a.todo));

		let miss = userHabitInfo.habitList.filter(function (habit) {
			return habit.missing > 0 && habit.schedule.includes(day);
		});

		// Sort missed habits in a way that if it is missed for once it will
		// show up first in the list, otherwise order in descending order.
		miss.sort((a, b) => {
			if (b.missing === a.missing && b.missing === 1) {
				return 0;
			} else if (a.missing === 1) {
				return -1;
			} else if (b.missing === 1) {
				return 1;
			} else {
				return b.missing - a.missing;
			}
		});

		let mastered = userHabitInfo.habitList.filter(function (habit) {
			return habit.continuous == masteryDays;
		});

		let habit = { habitList: habitShow };
		let missing_habits = { missing_habits: miss };
		let mastered_habits = { mastered_habits: mastered };

		let info = {
			expValue: userHabitInfo.expValue,
			heart: userHabitInfo.heart,
			_id: userHabitInfo._id,
			user: userHabitInfo.user,
		};

		let return_object_1 = extend({}, info, habit);
		let return_object_2 = extend({}, return_object_1, missing_habits);
		let return_object = extend({}, return_object_2, mastered_habits);

		return res.status(200).json(return_object);
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
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


