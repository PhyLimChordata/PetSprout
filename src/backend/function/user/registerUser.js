const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const User = require('../../schemas/userSchema');
const Habit = require('../../schemas/habitSchema');
const Achievements = require('../../schemas/achievementSchema');
const Mailing = require('../../schemas/mailingValidationSchema');
const Setting = require('../../schemas/settingSchema');
const Pet = require('../../schemas/petsSchema');
const bcryptjs = require('bcryptjs');

const Analyze = require('../../schemas/analyzeSchema');

const logError = (error_msg) => { console.log("    > " + error_msg)}

const user_regist = async (req, res) => {
	try {
		let { userName, email, password, timezone } = req.body;
		console.log(`Registering user (username=${req.body.userName}, email=${req.body.email})`)
		let userPresent, emailPresent = false;

		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			logError("Encountered errors while validating request body:")
			console.log(errors.array())
			return res.status(400).json({ error: errors.array() });
		}

		let fetchUserName = await User.findOne({ userName }).select('-password');
		if (fetchUserName) userPresent = true;

		let user = await User.findOne({ email }).select('-password');
		if (user) emailPresent = true;
		
		if (userPresent || emailPresent) return res.status(401).json([userPresent, emailPresent])

		let newUser = new User({
			userName,
			email,
			status: 0,
			password,
			lastlogin: null,
			timezone
		});

		// hashedpassword (security)
		const salt = await bcryptjs.genSalt(10);
		let hashedPassword = await bcryptjs.hash(password, salt);
		newUser.password = hashedPassword;

		//save to the database
		await newUser.save();
		logError(`Successfully saved user to database, now sending validation email to ${email} for ${userName}...`)

		const code = require('crypto').randomBytes(16).toString('hex');
		sendUserEmail(email, code);
		logError(`Successfully sent validation email to user ${userName} to email ${email}`)

		await Mailing.deleteMany({ email });
		logError(`Successfully deleted all records of sent verifications to user ${userName} (email=${email})!`)
		let newEmail = new Mailing({
			email,
			veri_code: code,
		});
		
		console.log(newEmail);
		await newEmail.save();
		logError(`Successfully stored new instance of verifications for user ${userName} (email=${email})`)
		return res.status(200).json('Success');
	} catch (error) {
		console.error(error)
		return res.status(500).json('Server error');
	}
};

const user_activation = async (req, res) => {
	console.log(`Activating user (email=${req.params.email}):`)
	try {
		let code = req.params.code;
		let email = req.params.email;

		let mail_vali = await Mailing.findOne({ email });
		if (!mail_vali) {
			logError(`No validation email was sent to ${email} (email can't be found in table Mailing). User account may have already been activated.`)
			return res
				.status(401)
				.json('msg:' + 'Sent validation email not found in database. User account may have already been activated.');
		}

		console.log(mail_vali);
		const intervalTime = 1000 * 60 * 60;
		const endTime = new Date();
		if (endTime - mail_vali.time > intervalTime) {
			console.log('inside');
			await Mailing.deleteMany({ email });
			logError(`Validation code sent to ${email} was expired (expiration time was ${mail_vali.time} and current time is ${endTime})`)
			return res.status(401).json('msg:' + 'Code is expired');
		}

		if (code !== mail_vali.veri_code) {
			logError(`Validation code in ${email} does not match code stored in database: received: ${code} but expecting ${mail_vali.veri_code}`)
			return res.status(401).json('msg:' + ' incorrect validation code' + ', another verification email may have been sent. please check again for the newest one.')
		}

		let user = await User.findOne({ email });
		if (!user) {
			logError(`Successfully validated ${email}, but cannot find user!`)
			return res.status(404).json("User doesn't exist");
		}
		user.status = 1;
		await user.save();

		//create user's pet
		let newPet = new Pet({
			user: user._id,
			pets: [],
		});
		await newPet.save();

		// create user habit
		let newUserHabit = new Habit({
			user: user._id,
		});
		await newUserHabit.save();

		let dailySchedule = [];
		let i = 0;
		for (i = 0; i < 7; i++) {
			dailySchedule.push(i.toString());
		}
		let current = new Date();
		let current_date = current.getDate();
		let current_day = current.getDay();
		let nextSignInDate = null;
		if (dailySchedule.includes(current_day.toString())) {
			nextSignInDate = current;
		} else {
			let index = current_day;
			let interval = 0;
			while (!dailySchedule.includes(index.toString())) {
				if (index === 6) index = 0;
				else index++;
				interval++;
			}
			nextSignInDate = current.setDate(current_date + interval);
			nextSignInDate = new Date(nextSignInDate);
		}
		let weekly_data = {
			'Assigned Readings': 'Make notes and review your PSYA02 readings',
			'Watch Lectures':
				'Attend, watch and keep up to date with PSYA02 lectures',
			'Make Schedule':
				'Assess, plan and prioritize your time for the following week',
		};
		let daily_data = {
			'1 Hour Work':
				'Engage in dedicated focused work with very few short breaks permitted. Recommended to use Pomodoro',
			'Check Announcements':
				'Keep up to date with Quercus, Course Announcements, Course Websites etc for any important academic events',
			'Check Agenda': 'This can also be a Calendar, Todo list or Notion',
			'Check Email':
				'Check your email for any important notices with your courses',
		};

		for (data in daily_data) {
			let newAnalyze = new Analyze({});
			await newAnalyze.save();
			let desc = daily_data[data];
			let newHabit = {
				analyze: newAnalyze._id,
				title: data,
				description: desc,
				reason: '',
				schedule: dailySchedule,
				times: 1,
				alarm: [],
				nextSignInDate,
			};

			newUserHabit.habitList.push(newHabit);
		}
		console.log(newUserHabit);

		let weeklySchedule = ['5'];
		if (weeklySchedule.includes(current_day.toString())) {
			nextSignInDate = current;
		} else {
			let index = current_day;
			let interval = 0;
			while (!dailySchedule.includes(index.toString())) {
				if (index === 6) index = 0;
				else index++;
				interval++;
			}
			nextSignInDate = current.setDate(current_date + interval);
			nextSignInDate = new Date(nextSignInDate);
		}

		for (data in weekly_data) {
			let newAnalyze = new Analyze({});
			await newAnalyze.save();
			let desc = weekly_data[data];
			let newHabit = {
				analyze: newAnalyze._id,
				title: data,
				description: desc,
				reason: '',
				schedule: weeklySchedule,
				times: 1,
				alarm: [],
				nextSignInDate,
			};

			newUserHabit.habitList.push(newHabit);
		}

		await newUserHabit.save();

		// create setting
		let newUserSetting = new Setting({
			user: user._id,
		});
		await newUserSetting.save();

		// creating achievements
		let newUserAchievements = new Achievements({
			user: user._id,
		});
		await newUserAchievements.save();

		await Mailing.deleteMany({ email });
		return res.status(200).json('Success');
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};

const send_activate_email = async (req, res) => {
	console.log("Resending activation email:")
	try {
		let { email } = req.body;

		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			logError(`Encountered errors while resending activation email to ${email}...`)
			console.log({ error: error.array() })
			return res.status(400).json({ error: error.array() });
		}

		await Mailing.deleteMany({ email });
		logError(`Successfully deleted all records of verification codes related to ${email}`)

		let user = await User.findOne({ email });
		if (!user) {
			logError(`User with email ${email} does not exist in the database.`)
			return res.status(404).json("User hasn't been registered in");
		}
		const code = require('crypto').randomBytes(16).toString('hex');
		sendUserEmail(email, code);

		let newEmail = new Mailing({
			email,
			veri_code: code,
		});
		console.log(newEmail);
		await newEmail.save();
		logError(`Successfully save sent email to Mailing!`)
		return res.status(200).json('Success');
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};

const regEmail =
	/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

function sendUserEmail(cnd, code) {
	try {
		console.log('sendUserEmail start --> ' + JSON.stringify(cnd));
		if (regEmail.test(cnd)) {
			const transport = nodemailer.createTransport(
				smtpTransport({
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						user: 'petsprouthelp@gmail.com',
						pass: 'bbnfjimyikmcpsns',
					},
				}),
			);
			var html =
				'Welcome to PetSprout! <br><br>You have recently signed up a new account and the next step is to activate it! If this doesn’t apply to you or you are unaware of PetSprout as a whole, please ignore this message.' +
				'<br><br>Your adventure with your new pet will start once you click the button below! After doing so, you may log into your account with your credentials and be provided with a set of habits dedicated to building you into a student that thrives.' +
				'<br><br>So, what are you waiting for?<br><a href="http://localhost:5000/api/v1.0.0/user/activation///">Click this link to verify your account!<' +
				code +
				'/' +
				cnd +
				'' +
				'a>' +
				'<br><br>We hope you have a fun time building your habits!' +
				'<br><br>Thanks!';
			console.log(html);
			var data = {
				from: 'PetSprout',
				to: cnd,
				subject: 'Validation',
				html: html,
			};
			console.log(data);
			transport.sendMail(data);
		} else {
			assert(false, 422, 'Please enter correct email syntax');
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
}

exports.user_regist = user_regist;
exports.user_activation = user_activation;
exports.send_activate_email = send_activate_email;
