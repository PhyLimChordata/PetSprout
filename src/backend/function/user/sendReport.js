const User = require('../../schemas/userSchema');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { validationResult } = require('express-validator');

const sendBugReport = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		let { message } = req.body;

		let user = await User.findById(req.user.id).select('-password');

		if (!user) return res.status(404).json('User not found');

		let email = user.email;
		sendEmail(message, email, 'Bug Report');

		res.status(200).json('Success');
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

const sendFeedbackReport = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		let { message } = req.body;

		let user = await User.findById(req.user.id).select('-password');

		if (!user) return res.status(404).json('User not found');

		let email = user.email;
		sendEmail(message, email, 'Bug Report');

		res.status(200).json('Success');
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

const regEmail =
	/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

function sendEmail(message, email, type) {
	try {
		console.log('sendEmail start --> ' + JSON.stringify(email));
		if (regEmail.test(email)) {
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
				'<table> <tr> <td>User</td> <td>Report</td> </tr> <tr>' +
				'<td>' +
				email +
				'</td>' +
				'<td>' +
				message +
				'</td> </tr> </table>';
			console.log(html);
			var data = {
				from: 'habipetshelp@gmail.com',
				to: 'habipetshelp@gmail.com',
				subject: type,
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

exports.sendBugReport = sendBugReport;
exports.sendFeedbackReport = sendFeedbackReport;
