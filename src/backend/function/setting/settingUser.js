const Setting = require('../../schemas/settingSchema');

const get_user_setting = async (req, res) => {
	try {
		let user_id = req.user.id;

		let user_setting = await Setting.findOne({ user: user_id });

		if (!user_setting) return res.status(404).json('User not found');

		res.status(200).json(user_setting);
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

const update_user_setting = async (req, res) => {
	try {
		/*
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: error.array() });*/

		
		let user_id = req.user.id;
		let user_setting = await Setting.findOne({ user: user_id });

		if (!user_setting) return res.status(404).json('User not found');

		let {
			pushNotification,
			emailNotification,
			voiceNotification,
			vibration,
			reminder,
		} = req.body;

		if(pushNotification != null) {
			user_setting.pushNotification = pushNotification;	
		}
		if(emailNotification != null) {
			user_setting.emailNotification = emailNotification;
		}
		if(voiceNotification != null) {
			user_setting.voiceNotification = voiceNotification;
		}
		if(vibration != null) {
			user_setting.vibration = vibration;
		}
		if(reminder != null) {
			user_setting.reminder = reminder;
		}

		await user_setting.save();

		res.status(200).json(user_setting);
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

const update_user_themeColor = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: error.array() });

		let { themeColor } = req.body;
		let user_id = req.params.id;
		let user_setting = await Setting.findOne({ user: user_id });

		if (!user_setting) return res.status(404).json('User not found');

		user_setting.themeColor = themeColor;

		await user_setting.save();

		res.status(200).json(user_setting);
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

const update_user_mode = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ error: error.array() });

		let { mode } = req.body;
		let user_id = req.params.id;
		let user_setting = await Setting.findOne({ user: user_id });

		if (!user_setting) return res.status(404).json('User not found');

		user_setting.mode = mode;

		await user_setting.save();

		res.status(200).json(user_setting);
	} catch (error) {
		console.error(error);
		return res.status(500).json('server error');
	}
};

exports.get_user_setting = get_user_setting;
exports.update_user_setting = update_user_setting;
exports.update_user_themeColor = update_user_themeColor;
exports.update_user_mode = update_user_mode;
