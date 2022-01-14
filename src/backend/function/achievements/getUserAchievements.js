
const Achievement = require('../../schemas/achievementSchema');
const UserHabits = require('../../schemas/habitSchema');
const UserPets = require('../../schemas/petsSchema');

const get_user_achievements = async (req, res) => {
    try {
        let user_id = req.user.id;

        let user_achievements = await Achievement.findOne({ user: user_id });
        console.log("Retrieved achievements for user with id: " + user_id);

        //if(!user_achievements) return res.status(404).json('Achievements not found for user');
        if(!user_achievements){
            console.log(`User id ${user_id} has no achievements, creating achievements`);
            let newUserAchievements = new Achievement({
                user: user_id
            })
            await newUserAchievements.save();
            user_achievements = newUserAchievements;
        }

        // check maturity and pet count
        let user_pets = await UserPets.findOne({ user : user_id });
        if(user_pets) {
            if(user_pets.currentPet){
                if(user_achievements.achievements.habipet.maturity < user_pets.currentPet.level)
                    user_achievements.achievements.habipet.maturity = user_pets.currentPet.level
            }
            for(let pet in user_pets.pets) {
                console.log(pet.expValue)
                if(pet.level > user_achievements.achievements.habipet.maturity)
                    user_achievements.achievements.habipet.maturity = pet.level
            }
            // User has at least 1 pet (Default pet + more pets in the future)
            user_achievements.achievements.habipet.pet_count = user_pets.pets.length + 1;
        } else {
            console.log(`User id ${user_id} has no pets`);
        }

        // check habit count nad mastery conut
        let user_habits = await UserHabits.findOne({ user : user_id });
        if(user_habits) {
            const habitList = user_habits.habitList;
            let habit_count = 0;
            let mastery_count = 0;
            let max_cont = -1;
            for(let index in habitList) {
                let habit = habitList[index];
                var streak = 3; 
                var mastered_habit_day = 66;
                if(habit.continuous >= streak) habit_count++;
                if(habit.continuous >= mastered_habit_day) mastery_count++;
                if(habit.continuous > max_cont) max_cont = habit.continuous;
            }

            if(user_achievements.achievements.streaks.habit_count < habit_count)
                user_achievements.achievements.streaks.habit_count = habit_count;

            if(user_achievements.achievements.streaks.mastery < mastery_count)
                user_achievements.achievements.streaks.mastery = mastery_count;

            if(user_achievements.achievements.streaks.commitment < max_cont)
                user_achievements.achievements.streaks.commitment = max_cont;
        } else {
            console.log(`User id ${user_id} has no habits`)
        }

        // check pet health streak
        if(user_achievements.pet_health_streak > user_achievements.achievements.accountability.health)
            user_achievements.achievements.accountability.health = user_achievements.pet_health_streak;

        await user_achievements.save();
        res.status(200).json(user_achievements.achievements);
    } catch(error) {
        console.error(error)
        return res.status(500).json('server error');
    }
};

// return the user's current login streaks as an integer
const get_current_login_streaks = async(req, res) => {
    try {
        let user_id = req.user.id;

        let user_achievements = await Achievement.findOne({ user: user_id }, { _id: 0, login_streak: 1 });
        console.log(`get user_achievements for user with id ${user_id}`);

        return res.status(200).json(user_achievements.login_streak);
        
    } catch(error) {
        console.error(error)
        return res.status(500).json('server error');
    }
}

exports.get_user_achievements = get_user_achievements;
exports.get_current_login_streaks = get_current_login_streaks;