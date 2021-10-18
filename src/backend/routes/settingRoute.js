const router = require('express').Router();
const authentication = require('../middleware/authentication');

const settingUser = require('../function/setting/settingUser')

router.get('/getUserSetting', authentication, settingUser.get_user_setting);

router.put('/updateUserSetting', authentication, settingUser.update_user_setting);

module.exports = router;