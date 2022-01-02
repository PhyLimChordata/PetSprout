const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Mailing = require('../schemas/mailingValidationSchema');

module.export = (mailingValidation) => {
	const transport = nodemailer.createTransport(
		smtpTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: 'petsprouthelp@gmail.com',
				pass: 'Q$m?67&Ldf7KiR3!S45o',
			},
		}),
	);

	const randomFns = () => {
		let code = '';
		for (let i = 0; i < 6; i++) {
			code += parseInt(Math.random() * 10);
		}
		return code;
	};

	const regEmail =
		/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	return async (req, res, next) => {
		let { EMAIL } = req.body;
		if (regEmail.test(EMAIL)) {
			let code = randomFns();
			transport.sendMail(
				{
					from: 'PetSprout',
					to: EMAIL,
					subject: 'Validate your email',
					html: `
                <p>Validation code: 
                <strong style="color: #ff4e2a;">${code}</strong>
                <\p>
                <p>Please enter the validation code within 5 min<\p>
                `,
				},
				function (error, data) {
					assert(!error, 500, 'Fail to send validation email');
					transport.close();
				},
			);
			const email = EMAIL;
			await Mailing.deleteMany({ email });
			const [data] = await Mailing.insertMany({ email, veri_code: code });
			setTimeout(async () => {
				await Mailing.deleteMany({ email });
			}, 1000 * 60 * 5);
		} else {
			assert(false, 422, 'Please enter correct email syntax');
		}

		next();
	};
};
