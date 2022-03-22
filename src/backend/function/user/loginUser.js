const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const Achievement = require('../../schemas/achievementSchema');
const Pet = require('../../schemas/petsSchema');

const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HabitDAO = require('../habit/habitsDAO')
const UserDAO = require('./userDAO')
const health = require('../pets/health')
const {parseDateTime} = require('../common/time')

const { DateTime } = require("luxon");

module.exports = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		let { primaryInfo, password, date, expoPushToken, timezone } = req.body;

		if (typeof primaryInfo == 'undefined') {
			return res.status(400).json('Email or user name should be provided')
		}
		if (typeof date == 'undefined') {
			return res.status(400).json('Date should be provided.');
		}

		// Get user
		let userResult = await UserDAO.getUser(primaryInfo, true)
		if (userResult.msg != "success") {
			console.log(userResult.msg)
			return res.status(userResult.code).json(userResult.msg)
		}
		let user = userResult.result

		// Check if user timezone changed, update if it did
		if (timezone && (user.timezone == null || user.timezone != timezone)) {
			await UserDAO.updateTimezone(user, timezone);
		}

		// Check if user has been verified/activated
		if (user.status === 0) {
			console.log(`Login User: User ${user._id} hasn't been verified`)
			return res.status(400).json("User hasn't been activated");
		}

		// Check if password is correct
		let matching = await bcryptjs.compare(password, user.password);
		if (!matching) return res.status(401).json('Wrong password');

		// if user last login is not null, check if it is a new day and update todo and check streaks
		if (user.lastlogin !== null) {
			// use luxon DateTime to create dates and sets it to user timezone (passed from frontend)
			console.log('date:'+date)
			var currentDate = parseDateTime(date,timezone);
			var lastLoginDate = DateTime.fromISO(user.lastlogin.toISOString(), { zone: timezone });

			// calculate days apart and convert it to days from miliseconds
			daysApart = ((currentDate - lastLoginDate)/ (1000 * 60 * 60 * 24)).toFixed(1);

			// Get user habits
			let getHabitsResults = await HabitDAO.getHabits(user._id)
			if(getHabitsResults.msg != "success") {
				return res.status(getHabitsResults.code).json(getHabitsResults.msg)
			}
			let userHabit = getHabitsResults.result

			// Update habits todo and streaks for new day
			if (daysApart > 0) {
				if (userHabit.habitList !== null) {
					// for each habit, reset to to do (0, 1 being done)
					for (const habit of userHabit.habitList) {
						habit.todo = 0;
					}
					await userHabit.save()
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

		user.lastlogin = new Date(date);

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
