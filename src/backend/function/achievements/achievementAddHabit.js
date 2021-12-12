const  Achievement = require('../../schemas/achievementSchema');
const User = require('../../schemas/userSchema');

const increase_habit_count = async (req, res) => {
    try {
        let user_id = req.user.id;
        let user_achievements = await Achievement.findOne({ user: user_id });

        if(!user_achievements) return req.status(404).json('Achievements not found');
    } catch (error) {
        
    }
}