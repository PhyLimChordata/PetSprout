const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');

module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let date = req.params.day;

		let userHabitInfo = await Habit.findOne({ user: req.user.id });
		if (!userHabitInfo)
			return res.status(404).json("User's habits could not found");

		let today = new Date(date);
		today.setHours(0, 0, 0);
		let day = today.getDay();
		let user_last_login = user.lastlogin;
		user_last_login.setHours(0, 0, 0);
		let lastUpdate = userHabitInfo.updatedAt;
		lastUpdate.setHours(0, 0, 0);
		if(lastUpdate - today < 0) {
			// user logged in new day
			for(let index in userHabitInfo.habitList) {
				// reset all counts to 0
				let habit = userHabitInfo.habitList[index];
				habit.todo = 0; 
				// check continuity
				let signDate = new Date(habit.nextSignInDate);
				signDate.setHours(0, 0, 0);
				// if the next sign in date for habit is before today, then user missed (since not reset),
				// user loses streak
				if(signDate - today < 0) {
					habit.continuous = 0;
					habit.missing++;
					// reset next sign in date
					let interval = 0;
					let index = today.getDay();
					while(!habit.schedule.includes(index.toString())) {
						if(index+1 > 7) {
							index = 0;
						} else {
							index++;
						}
						interval++;
					}
					let newSignDate = today.setDate(today.getDate() + interval);
					habit.nextSignInDate = new Date(newSignDate);
				}
				userHabitInfo.habitList[index] = habit;
			}
			await userHabitInfo.save();
		}

		// Filtering out habits to be shown
		let habitShow = userHabitInfo.habitList.filter(function (habit) {
			/*
			// only show if incompleted: todo is less than times
			if(habit.times > habit.todo) {
				// only show if previous satisfies and scheduled to today
				return habit.schedule.includes(day);
			} else {
				return false;
			}
			*/
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
