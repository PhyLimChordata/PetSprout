const Achievement = require('../../schemas/achievementSchema');
const UserHabits = requre('../../schemas/habitSchema');

const update_habit_count = async(req, res) => {
    try {
        let user_habits = await UserHabits.findOne({ user: user_id });
        if(!user_habits) return res.status(404).json('User habits not found');
        const habitlist = user_habits.habitlist;

        let habit_count = 0;
        for(let habit in habitlist) {
            if(habit.continuous >= 3) habit_count++;
        }

        let user_id = req.user.id;
        let user_achievements = await Achievement.findOne({ user: user_id });
        if(!user_achievements) return res.status(404).json('User achievements not found');
        if(user_achievements.achievements.streaks.habit_count < habit_count) user_achievements.achievements.streaks.habit_count = habit_count;

		await user_achievements.save();

		res.status(200).json({ "habit_count": habit_count });

	} catch (error) {
		console.log(error);
		return res.status(500).json('server error');
	}
};