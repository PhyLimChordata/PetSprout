const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const Achievement = require('../../schemas/achievementSchema');
const Pet = require('../../schemas/petsSchema');

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

		if (typeof date == 'undefined') {
			return res.status(400).json('Date should be provided.');
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
		let current = new Date(date);
		if (user.lastlogin !== null) {
			let lastLoginYear = user.lastlogin.getFullYear();
			let lastLoginMonth = user.lastlogin.getMonth();
			let lastLoginDate = user.lastlogin.getDate();
			current.setHours(0, 0, 0, 0);
			let lastLogin = new Date(lastLoginYear, lastLoginMonth, lastLoginDate);
			let userHabit = await Habit.findOne({ user: user._id });
			const daysApart = ((current - lastLogin)/ (1000 * 60 * 60 * 24)).toFixed(1);
			console.log(daysApart);
			// Update habits todo and streaks for new day
			if (daysApart > 0) {
				if (userHabit.habitList !== null) {
					// for each habit, reset to to do (0, 1 being done)
					for (const habit of userHabit.habitList) {
						habit.todo = 0;
					}
				}
				// Find user's achievement and pets
				let userAchievements = await Achievement.findOne({ user : user._id });
				let userPets = await Pet.findOne({ user : user._id });
				// Ensure both are found
				if(!userAchievements || !userPets) {
					//console.log("No achievement or pets");
				} else {
					// update login streaks
					if(daysApart == 1) {
						let new_streak = userAchievements.login_streak + 1;
						userAchievements.login_streak = new_streak;
			
						// Check if this is a new longest streak
						if (userAchievements.achievements.accountability.login < new_streak) {
							userAchievements.achievements.accountability.login = new_streak;
						}
					} else if (daysApart > 1) {
						// Player loses streak as they didn't login everyday
						userAchievements.login_streak = 1;
					}

					// Check pet health to update the consecutive days that user's pet have at least
					// 50% of max health
					if(userPets.currentPet) {
						if(userPets.currentPet.hp < userPets.currentPet.maxhp / 2) {
							userAchievements.pet_health_streak = 0;
						} else {
							userAchievements.pet_health_streak++;
						}
					} 
					/*
					***For more than one pet, only current pet at this version.***
					if(userPets.pets.length > 0) {
						let hasStreak = 1;
						for(let pet in userPets.pets) {
							if(pet.hp < pet.maxhp/2) {
								userAchievements.pet_health_streak = 0;
								hasStreak = 0;
							};
						}
						if(hasStreak) userAchievements.pet_health_streak++;
					}
					*/
				}
				await userAchievements.save();
			}
			
			if (userHabit.habitList !== null) {
				for (const habit of userHabit.habitList) {
					let next = new Date(habit.nextSignInDate);
					var nextDate = next.getDate();
					if (next < current && nextDate !== currentDate) {
						habit.continuous = 0;
						habit.missing++;
						let interval = 0;
						let index = current.getDay();
						while(!habit.schedule.includes(index.toString())) {
							if(index+1 > 7) {
								index = 0;
							} else {
								index++;
							}
							interval++;
						}
						let today = current;
						today.setDate(today.getDate() + interval);
						habit.nextSignInDate = new Date(today);
					}
				}
				userHabit.save();
			}
		}

		user.lastlogin = current;
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
