const router = require('express').Router();
const authentication = require('../middleware/authentication');

const achievementsUser = require('../function/achievements/achievementsUser.js');
const getAchievements = require('../function/achievements/getUserAchievements')

router.get(
	'/getAchievements',
	authentication,
	getAchievements.get_user_achievements,
);

router.put(
	'/updateAchievements',
	authentication,
	achievementsUser.update_user_achievements,
);

router.put(
	'/updateLoginStreaks/:date',
	authentication,
	achievementsUser.update_login_streaks,
);

module.exports = router;
