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

const user_regist = async (req, res) => {
	try {
		let { userName, email, password } = req.body;

		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: errors.array() });

		let user = await User.findOne({ email }).select('-password');

		if (user) return res.status(401).json('User email exists');

		let fetchUserName = await User.findOne({ userName }).select('-password');
		if (fetchUserName === userName)
			return res.status(401).json('User name exists');

		let newUser = new User({
			userName,
			email,
			status: 0,
			password,
			lastlogin: null,
		});

		// hashedpassword (security)
		const salt = await bcryptjs.genSalt(10);
		let hashedPassword = await bcryptjs.hash(password, salt);
		newUser.password = hashedPassword;

		//save to the database
		await newUser.save();

		const code = require('crypto').randomBytes(16).toString('hex');
		sendUserEmail(email, code);

		await Mailing.deleteMany({ email });
		let newEmail = new Mailing({
			email,
			veri_code: code,
		});
		console.log(newEmail);
		await newEmail.save();
		res.status(200).json('Success');
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};

const user_activation = async (req, res) => {
	try {
		let code = req.params.code;
		let email = req.params.email;

		let mail_vali = await Mailing.findOne({ email });
		if (!mail_vali)
			return res
				.status(200)
				.json('msg:' + 'No validation email was send before');

		console.log(mail_vali);
		const intervalTime = 1000 * 60 * 60;
		const endTime = new Date();
		if (endTime - mail_vali.time > intervalTime) {
			console.log('inside');
			await Mailing.deleteMany({ email });
			return res.status(200).json('msg:' + 'Code is expired');
		}

		if (code !== mail_vali.veri_code)
			res.status(200).json('msg:' + 'incorrect validation code');

		let user = await User.findOne({ email });
		if (!user) res.status(404).json("User doesn't exist");
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
		res.status(200).json('Success');
	} catch (error) {
		console.error(error);
		return res.status(500).json('Server error');
	}
};

const send_activate_email = async (req, res) => {
	try {
		let { email } = req.body;

		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: error.array() });

		await Mailing.deleteMany({ email });

		let user = await User.findOne({ email });
		if (!user) return res.status(404).json("User hasn't been registered in");

		const code = require('crypto').randomBytes(16).toString('hex');
		sendUserEmail(email, code);

		let newEmail = new Mailing({
			email,
			veri_code: code,
		});
		console.log(newEmail);
		await newEmail.save();
		res.status(200).json('Success');
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
						user: 'habipetshelp@gmail.com',
						pass: 'mvpiybwihptcqlgr',
					},
				}),
			);
			var html =
				'<a href="http://127.0.0.1:5000/api/v1.0.0/user/activation/' +
				code +
				'/' +
				cnd +
				'/' +
				'">' +
				'Click to verifiy the email and return back to app page </a>';
			console.log(html);
			var data = {
				from: 'HabiPets',
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
