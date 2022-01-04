const router = require('express').Router();
const authentication = require('../middleware/authentication');

const achievementsUser = require('../function/achievements/achievementsUser.js');

router.get(
	// #swagger.description = 'DESCRIPTION: Today is going to be a good day.'
	// #swagger.summary = 'SUMMARY: Today is going to be a bad day.'
	// #swagger.tags = ['Tag1', 'Tag2']
	'/getAchievements',
	authentication,
	achievementsUser.get_user_achievements,
);
router.put(
	'/updateAchievements',
	authentication,
	achievementsUser.update_user_achievements,
);

router.put(
	'/updateLoginStreaks',
	authentication,
	achievementsUser.update_login_streaks,
);

module.exports = router;
