const Achievement = require('../../schemas/achievementSchema');
const UserHabits = require('../../schemas/habitSchema');
const UserPets = require('../../schemas/petsSchema');

const get_user_achievements = async (req, res) => {
    try {
        let user_id = req.user.id;

        let user_achievements = await Achievement.findOne({ user: user_id });
        console.log(user_achievements);

        //if(!user_achievements) return res.status(404).json('Achievements not found for user');
        if(!user_achievements){
            console.log("User has no achievements, creating achievements");
            let newUserAchievements = new Achievement({
                user: user_id
            })
            await newUserAchievements.save();
            user_achievements = newUserAchievements;
        }

        // check maturity and pet count
        let user_pets = await UserPets.findOne({ user : user_id });
        if(user_pets) {
            for(let pet in user_pets.pets) {
                if(pet.expValue > user_achievements.achievements.habipet.maturity)
                    user_achievements.achievements.habipet.maturity = pet.expValue
            }
            user_achievements.achievements.habipet.pet_count = user_pets.pets.length;
        }

        // check habit count nad mastery conut
        let user_habits = await UserHabits.findOne({ user : user_id });
        if(user_habits) {
            const habitlist = user_habits.habitlist;

            let habit_count = 0;
            let mastery_count = 0;
            for(let habit in habitlist) {
                if(habit.continuous >= 3) habit_count++;
                if(habit.continuous >= 66) mastery_count++;
            }

            if(user_achievements.achievements.streaks.habit_count < habit_count)
                user_achievements.achievements.streaks.habit_count = habit_count;

            if(user_achievements.achievements.streaks.mastery < mastery_count)
                user_achievements.achievements.streaks.mastery = mastery_count;
        }

        // check pet health streak
        if(user_achievements.pet_health_streak > user_achievements.achievements.accountability.health)
            user_achievements.achievements.accountability.health = user_achievements.pet_health_streak;

        await user_achievements.save();
        res.status(200).json(user_achievements.achievements);
    } catch(error) {
        console.log(error)
        return res.status(500).json('server error');
    }
}

exports.get_user_achievements = get_user_achievements;