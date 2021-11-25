const Achievement = require('../../schemas/achievementSchema');

const get_user_achievements = async (req, res) => {
	try {
		let user_id = req.user.id;

		let user_achievements = await Achievement.findOne({ user: user_id });

		if (!user_achievements)
			return res.status(404).json('Achievements not found for user');

		res.status(200).json(user_achievements);
	} catch (error) {
		console.log(error);
		return res.status(500).json('server error');
	}
};

exports.get_user_achievements = get_user_achievements;
