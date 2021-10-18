const router = require('express').Router();
const authentication = require('../middleware/authentication');

const achievementsUser = require('../function/achievements/achievementsUser.js')

router.get('/getAchievements', authentication, achievementsUser.get_user_achievements);

router.put('/updateAchievements', authentication, achievementsUser.update_user_achievements);

module.exports = router;