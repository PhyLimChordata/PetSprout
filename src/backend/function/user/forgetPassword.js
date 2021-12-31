const User = require('../../schemas/userSchema');
const Mailing = require('../../schemas/mailingValidationSchema');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bcryptjs = require('bcryptjs');

const checkUserExist = async (req, res) => {
	try {
		let { primaryInfo } = req.body;
		console.log(primaryInfo);

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
			if (!user) return res.status(404).json("User hasn't been registered in");
			email = user.email;
		} else {
			user = await User.findOne({ email });
			if (!user) return res.status(404).json("User hasn't been registered in");
		}

		if (user.status === 0) return res.status(403).json({ email: email });

		res.status(200).json({ email: email });
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const pending_password = async (req, res) => {
	try {
		let { newPassword, email } = req.body;

		let user = await User.findOne({ email });
		if (!user) return res.status(404).json('User not found');

		user.pending_password = newPassword;
		await user.save();

		await Mailing.deleteMany({ email });

		const code = require('crypto').randomBytes(16).toString('hex');
		sendUserEmail(email, code);

		let newEmail = new Mailing({
			email,
			veri_code: code,
		});
		console.log(newEmail);
		await newEmail.save();
		res.status(200).json('Email has been sent successfully');
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

const reset_password = async (req, res) => {
	try {
		let code = req.params.code;
		let email = req.params.email;

		let mail_vali = await Mailing.findOne({ email });
		if (!mail_vali)
			return res
				.status(200)
				.json('msg:' + 'No validation email was send before');

		const intervalTime = 1000 * 60 * 60;
		const endTime = new Date();
		if (endTime - mail_vali.time > intervalTime) {
			console.log('inside');
			await Mailing.deleteMany({ email });
			return res.status(200).json('msg:' + 'Code is expired');
		}

		if (code !== mail_vali.veri_code)
			return res.status(200).json('msg:' + 'incorrect validation code');

		let user = await User.findOne({ email });
		if (!user) res.status(404).json("User doesn't exist");
		let newPassword = user.pending_password;

		const salt = await bcryptjs.genSalt(10);
		let hashedPassword = await bcryptjs.hash(newPassword, salt);
		user.password = hashedPassword;

		await user.save();
		await Mailing.deleteMany({ email });

		res.setHeader('Content-Type', 'text/html');
		res.sendfile(`${__dirname}/html_page/forgetPasswordSuccess.html`);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
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
						pass: 'mvpiybwihptcqlgr',
					},
				}),
			);

			var html =
				"Hello, <br><br>Recently, your password has been resetted. If this wasn't you, please ignore this message and contact us regarding a possible account breach. <br><br>To reset your password, you will need to confirm it was done so by you by clicking the link below. If you have forgotten what the password had been resetted to, you may always attempt to reset your password again." +
				'<br><br><a href="http://18.191.105.86:5000/api/v1.0.0/user/reset_password/' +
				code +
				'/' +
				cnd +
				'/' +
				'">' +
				'Click to allow resetting password and return back to app page </a>' +
				'<br><br>If problems proceed to continue, feel free to contact us and we can arrange another method of recovering your account.' +
				'<br><br>We hope you have a fun time building your habits!' +
				'<br><br>Thanks!';

			console.log(html);
			var data = {
				from: 'HabiPets',
				to: cnd,
				subject: 'Password Reset',
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

exports.checkUserExistl = checkUserExist;
exports.pending_password = pending_password;
exports.reset_password = reset_password;
