const Habit = require('../../schemas/HabitSchemas');
const User = require('../../schemas/UserSchemas');
const Analyze = require('../../schemas/AnalyzeSchemas');

module.exports = async (req, res) => {
	try {
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};
