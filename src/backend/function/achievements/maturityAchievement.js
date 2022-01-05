const Achievement = require('../../schemas/achievementSchema');
const UserHabits = requre('../../schemas/habitSchema');

const update_maturity = async(req, res) => {
    try {
        let user_id = req.user.id;

        let user_achievements = await Achievement.findOne({ user: user_id });
        if(!user_achievements) return res.status(404).json('User achievements not found');
        user_achievements.achievements.habipet.caretaker++;

		await user_achievements.save();

		res.status(200).json({ "caretaker": user_achievements.achievements.habipet.caretaker});

	} catch (error) {
		console.log(error);
		return res.status(500).json('server error');
	}
};

exports.update_maturity = update_maturity;