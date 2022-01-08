const router = require('express').Router();
const authentication = require('../middleware/authentication');

const achievementsUser = require('../function/achievements/achievementsUser.js');
const getAchievements = require('../function/achievements/getUserAchievements')

router.get(
	'/getAchievements',
	authentication,
	getAchievements.get_user_achievements,
);

router.get(
	'/getAchievements/currentLoginStreaks',
	authentication,
	getAchievements.get_current_login_streaks,
)

router.put(
	'/updateAchievements',
	authentication,
	achievementsUser.update_user_achievements,
);

module.exports = router;
