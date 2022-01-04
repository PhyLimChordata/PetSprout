const router = require('express').Router();
const authentication = require('../middleware/authentication');

const settingUser = require('../function/setting/settingUser');

router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Settings']
	'/getUserSetting', authentication, settingUser.get_user_setting);

router.put(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Settings']
	'/updateUserSetting',
	authentication,
	settingUser.update_user_setting,
);

module.exports = router;
