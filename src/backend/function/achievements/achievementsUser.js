const Achievement = require('../../schemas/achievementSchema');
const User = require('../../schemas/userSchema');

const update_login_streaks = async(req, res) => {
    try {
		let todaydate = req.params.date;
        let user_id = req.user.id;
        let user_achievements = await Achievement.findOne({ user: user_id });
        let user_lastlogin = await User.findById(user_id).select('lastlogin');

        if(!user_lastlogin) return res.status(404).json('Last login not found for user ' + user_id);
        
        let year = user_lastlogin.lastlogin.getFullYear();
        let month = user_lastlogin.lastlogin.getMonth();
        let date = user_lastlogin.lastlogin.getDate();

        if(!user_achievements) return res.status(404).json('Achievements not found');

		// Only update the database if the login is not on the same day
        let today = new Date(todaydate);
        today.setHours(0, 0, 0);
		let lastLogin = new Date(year, month, date);
		lastLogin.setHours(0, 0, 0);

		const daysApart = ((today - lastLogin)/ (1000 * 60 * 60 * 24)).toFixed(1);
		console.log("Days since last login of user id " + user_id + ": " + daysApart);
		if(daysApart == 1) {
			let new_streak = user_achievements.login_streak + 1;
			user_achievements.login_streak = new_streak;

			// Check if this is a new longest streak
			if (user_achievements.achievements.accountability.login < new_streak) {
				user_achievements.achievements.accountability.login = new_streak;
			}
		} else if (daysApart > 1) {
			// Player loses streak as they didn't login everyday
			user_achievements.login_streak = 1;
		}

		await user_achievements.save();

		res.status(200).json(user_achievements.login_streak);
	} catch (error) {
		console.log(error);
		return res.status(500).json('server error');
	}
};

const update_user_achievements = async (req, res) => {
	try {
		let user_id = req.user.id;
		let user_achievements = await Achievement.findOne({ user: user_id });

		if (!user_achievements)
			return res.status(404).json('Achievements not found');

		for (field in req.body) {
			console.log(field);
		}

		res.status(200).json(user_achievements);
	} catch (error) {
		console.log(error);
		return res.status(500).json('server error');
	}
};

exports.update_user_achievements = update_user_achievements;
exports.update_login_streaks = update_login_streaks;
