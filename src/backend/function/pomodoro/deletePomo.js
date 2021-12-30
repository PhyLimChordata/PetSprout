const Pomo = require('../../schemas/pomoSchema');
const User = require('../../schemas/userSchema');
const Analyze = require('../../schemas/analyzeSchema');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Delete a particular pomo and return back user's pomo.
 */

 module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json('User could not found');

		let userPomo = await Pomo.findById(req.params.user_pomo_id);
		if (!userHabit) return res.status(404).json("User's pomo could not find");

        //for pomo in  list check if id matches one to delete
		const deletePomoList = userPomo.pomoList.filter(
			(pomo) => pomo._id.toString() === req.params.pomo_id.toString(),
		);
        
		let analyzeId = deletePomoList[0].analyze;

		await Analyze.findByIdAndDelete(analyzeId);

		const pomoFromDB = userPomo.pomoList.filter(
			(pomo) =>pomo._id.toString() !== req.params.pomo_id.toString(),
		);
		userPomo.pomoList = pomoFromDB;
		await userPomo.save();
		res.json(userHabit);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

