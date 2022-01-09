const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const Analyze = require('../../schemas/analyzeSchema');
const alarmLib = require('./alarm');
const { validationResult } = require('express-validator');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Create a particular habit and return back the newly created habit.
 */
module.exports = async (req, res) => {
	try {
		let { title, description, reason, schedule, times, alarm, date } = req.body;

		let errors = [];
		if (title === '') errors.push('title');
		if (
			JSON.stringify(schedule) ==
			JSON.stringify([false, false, false, false, false, false, false])
		) {
			errors.push('schedule');
		}
		if (date === '') errors.push('date');

		if (errors.length != 0) return res.status(403).json({ error: errors });

		let newAnalyze = new Analyze({});
		await newAnalyze.save();

		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json({ error: ['User not found'] });

		let userHabit = await Habit.findOne({ user: req.user.id });
		if (!userHabit)
			return res
				.status(404)
				.json({ error: ["User's habit information not found"] });

		let newSchedule = [];
		let i = 0;
		for (const element of schedule) {
			if (element === true) newSchedule.push(i.toString());
			i++;
		}

		let current = new Date(date);
		let current_date = current.getDate();
		let current_day = current.getDay();
		let nextSignInDate = null;
		if (newSchedule.includes(current_day.toString())) {
			nextSignInDate = current;
		} else {
			let index = current_day;
			let interval = 0;
			while (!newSchedule.includes(index.toString())) {
				if (index === 6) index = 0;
				else index++;
				interval++;
			}
			nextSignInDate = current.setDate(current_date + interval);
			nextSignInDate = new Date(nextSignInDate);
		}

		// Generate Alarm List (this is so MongoDB will assign an ID)
		let alarmList = []
		for (const a of alarm) {
			alarmList.push({date: a})
		}

		let newHabit = {
			analyze: newAnalyze._id,
			title,
			description,
			reason,
			schedule: newSchedule,
			times,
			alarm: alarmList,
			nextSignInDate,
		};
		
		userHabit.habitList.push(newHabit);
		await userHabit.save();

		
		// Grab the list of alarms now it has ids associated.
		let updatedUserHabit = await Habit.findOne({ user: req.user.id });
		if (!updatedUserHabit)
			return res
				.status(404)
				.json({ error: ["User's habit information not found"] });
		var updatedHabit = updatedUserHabit.habitList.find(
			(habit) => habit.analyze.toString() === newAnalyze.id.toString(),
		);
		updatedAlarmList = updatedHabit.alarm

		// Grab the users ExpoPushTokens
		let userTokens = await User.findById(req.user.id).select('-password');
		tokens = userTokens.tokens

		// Schedule alarms for the user.
		for (const a in updatedAlarmList) {
			elem = updatedAlarmList[a];
			alarmLib.add(elem.date, newSchedule, elem._id, tokens)
		}
		
		res.json(newHabit);
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};
