const Achievement = require('../../schemas/achievementSchema');
const UserHabits = requre('../../schemas/habitSchema');

const update_mastery_count = async(req, res) => {
    try {
        let user_id = req.user.id;
        let user_habits = await UserHabits.findOne({ user: user_id });
        if(!user_habits){
            //console.log(`User id ${user_id} habits not found`);
            return res.status(404).json(`User id ${user_id} habits not found`); 
        } 
        
        const habitlist = user_habits.habitlist;

        let mastery_count = 0;
        var mastered_habit_day = 66;
        for(let habit in habitlist) {
            if(habit.continuous >= mastered_habit_day) mastery_count++;
        }

        let user_achievements = await Achievement.findOne({ user: user_id });
        if(!user_achievements){
            //console.log(`User id ${user_id} achievements not found`);
            return res.status(404).json(`User id ${user_id} achievements not found`);
        } 
        if(user_achievements.achievements.streaks.mastery < mastery_count) user_achievements.achievements.streaks.mastery = mastery_count;

		await user_achievements.save();

		res.status(200).json({ "mastery": mastery_count});

	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

exports.update_mastery_count = update_mastery_count;