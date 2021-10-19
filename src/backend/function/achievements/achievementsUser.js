const  Achievement = require('../../schemas/achievementSchema');
const User = require('../../schemas/userSchema');

const get_user_achievements = async (req, res) => {
    try {
        let user_id = req.user.id;

        let user_achievements = await Achievement.findOne({ user: user_id });

        if(!user_achievements) return res.status(404).json('Achievements not found for user');
        /*if(!user_achievements){
        let newUserAchievements = new Achievement({
			user: user_id
		})
		await newUserAchievements.save()}*/

        res.status(200).json(user_achievements);
    } catch(error) {
        console.log(error)
        return res.status(500).json('server error');
    }
}

const update_login_streaks = async(req, res) => {
    try {
        let user_id = req.user.id;
        let user_achievements = await Achievement.findOne({ user: user_id });
        let user_lastlogin = await User.findById(user_id).select('lastlogin');

        if(!user_lastlogin) return res.status(404).json('Last login not found');
        
        let year = user_lastlogin.lastlogin.getFullYear();
        let month = user_lastlogin.lastlogin.getMonth();
        let date = user_lastlogin.lastlogin.getDate();
        
        console.log(year + " " + month + " " + date)
        /*let user_info = await fetch('http://localhost:5000/api/v1.0.0/user/viewAccount', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authentication-token': getToken,
            },
        })*/

        if(!user_achievements) return res.status(404).json('Achievements not found');

        let new_streak = user_achievements.achievements.accountability.login_streak + 1;

        user_achievements.achievements.accountability.login_streak = new_streak;

        if(user_achievements.achievements.streaks.longest_streak < new_streak) {
            user_achievements.achievements.streaks.longest_streak = new_streak;
        }

        await user_achievements.save();

        res.status(200).json(user_achievements);
    } catch (error) {
        console.log(error)
        return res.status(500).json('server error');
    }
}

const update_user_achievements = async(req, res) => {
    try {
        let user_id = req.user.id;
        let user_achievements = await Achievement.findOne({ user: user_id });

        if(!user_achievements) return res.status(404).json('Achievements not found');

        for(field in req.body) {
            console.log(field)
        }

        res.status(200).json(user_achievements)

    } catch (error) {
        console.log(error)
        return res.status(500).json('server error');
    }
}

exports.get_user_achievements = get_user_achievements;
exports.update_user_achievements = update_user_achievements;
exports.update_login_streaks = update_login_streaks;