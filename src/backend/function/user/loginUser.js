const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const Achievement = require('../../schemas/achievementSchema');
const Pet = require('../../schemas/petsSchema');

const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HabitDAO = require('../habit/habitsDAO')
const health = require('../pets/health')

module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		let { primaryInfo, password, date, expoPushToken} = req.body;

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

			let habits = await HabitDAO.getHabits(user._id);
			if(habits.msg === "success") {
				let now = new Date(date);
				now.setHours(0,0,0,0);
				for(const habit of habits.result.habitList) {
					// Get the habit's initial todo date
					let todoTime = new Date(habit.nextSignInDate);
					todoTime.setHours(0,0,0,0);
					// If todo date is BEFORE today
					if(todoTime < now) {
						let newMissingValue = 0;
						let nextTodoTime = todoTime;
						// Keep looking for the next todo date until it is today or after
						while(nextTodoTime < now) {
							// Next to-do date has to be at least the next day or onwards
							let interval = 1;
							let nextTodoDay = now.getDay() + 1 > 6 ? 0 : now.getDay() + 1;
							// While the current checked day of week is not in the schedule, check the next day
							while(!habit.schedule.includes(nextTodoDay)) {
								nextTodoDay++;
								if(nextTodoDay > 6) nextTodoDay = 0;
								interval++;
							}
							// Habit missed for one interval, add by the number of times it should be done
							newMissingValue++;

							// Update the nextTodoTime with the interval
							nextTodoTime = new Date(nextTodoTime.setDate(nextTodoTime.getDate() + interval));
						}
						// Automatically updates continuous to 0 too for data consistency.
						let updateMissingSuccess = await HabitDAO.updateHabitMissing(user._id, habit._id, habit.missing + newMissingValue)
						if(updateMissingSuccess.msg !== "success") {
							console.log(updateMissingSuccess.msg)
						}
						let updateNextSignInDateSuccess = await HabitDAO.updateNextSignInDate(user._id, habit._id, nextTodoTime)
						if(updateNextSignInDateSuccess.msg !== 'success') {
							console.log(updateNextSignInDateSuccess.msg)
						}

						/* Health Loss based on missed streaks. */
						// console.log(`User ${user._id} missed the habit '${habit.title}' ${newMissingValue} times since last login.`)
						health.missedStreaksHealthLoss(user._id, newMissingValue)
					}
				}
			} else {
				console.log(" > Failed to retrieve habits")
			}
		}

		user.lastlogin = current;

		if(process.env.NOTIFICATIONTOGGLE === 'true') {
			/* Check if ExpoPushToken has already been saved. */
			if (expoPushToken === undefined) {
				console.log("expoPushToken was not received when logging in. " +
							"If you were using the client and this console message occurs, " + 
							"that is concerning.")
			} else {
				const checkToken = user.tokens.filter(
					(token) => token.expoPushToken.toString() === expoPushToken.toString(),
				);
		
				/* Save ExpoPushToken if it isn't associated with the account. */
				if(checkToken.length === 0){
					let token = {
						expoPushToken: expoPushToken
					};
					user.tokens.push(token);
				}
			}
		}
		

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
