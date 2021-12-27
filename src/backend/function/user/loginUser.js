const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');

const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		let { primaryInfo, password, date } = req.body;

		let email = '';
		let userName = '';

		if (primaryInfo === undefined) primaryInfo = '';

		if (regEmail.test(primaryInfo)) {
			email = primaryInfo;
		} else if (primaryInfo != '') {
			userName = primaryInfo;
		} else {
			res.status(400).json('Email or user name should be provided');
		}

		let user = null;
		if (email === '') {
			user = await User.findOne({ userName });
			if (!user) return res.status(404).json('User has not been created');
			email = user.email;
		} else {
			user = await User.findOne({ email });
			if (!user) return res.status(404).json('User has not been created');
		}

		if (user.status === 0)
			return res.status(400).json("User hasn't been activated");

		let matching = await bcryptjs.compare(password, user.password);
		if (!matching) return res.status(401).json('Wrong password');

		if (user.lastlogin !== null) {
			let lastLoginYear = user.lastlogin.getFullYear();
			let lastLoginMonth = user.lastlogin.getMonth();
			let lastLoginDate = user.lastlogin.getDate();

			// var current = new Date();
			var current = new Date(date);
			let userHabit = await Habit.findOne({ user: user._id });
			var currentYear = current.getFullYear();
			var currentMonth = current.getMonth();
			var currentDate = current.getDate();
			if (
				lastLoginDate !== currentDate ||
				lastLoginMonth !== currentMonth ||
				lastLoginYear !== currentYear
			) {
				if (userHabit.habitList !== null) {
					for (const habit of userHabit.habitList) {
						habit.todo = 0;
					}
				}
			}
			if (userHabit.habitList !== null) {
				for (const habit of userHabit.habitList) {
					let next = new Date(habit.nextSignInDate);
					var nextDate = next.getDate();
					if (next < current && nextDate !== currentDate) {
						habit.continuous = 0;
						habit.missing++;
					}
				}
			}
			userHabit.save();
		}

		user.lastlogin = date;
		await user.save();

		const payload = {
			user: {
				id: user._id,
			},
		};
		jwt.sign(
			payload,
			process.env.JSONWEBTOKEN,
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				res.status(200).json({ token: token, terms: user.termsAndAgreement });
			},
		);
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

const regEmail =
	/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
