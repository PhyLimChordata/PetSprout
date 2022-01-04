const router = require('express').Router();
const authentication = require('../middleware/authentication');

const achievementsUser = require('../function/achievements/achievementsUser.js');

router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['TagA', 'TagB']
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
