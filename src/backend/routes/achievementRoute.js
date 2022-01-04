const router = require('express').Router();
const authentication = require('../middleware/authentication');

const achievementsUser = require('../function/achievements/achievementsUser.js');

router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Achievements']
	'/getAchievements',
	authentication,
	achievementsUser.get_user_achievements,
);
router.put(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Achievements']
	'/updateAchievements',
	authentication,
	achievementsUser.update_user_achievements,
);

router.put(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Achievements']
	'/updateLoginStreaks',
	authentication,
	achievementsUser.update_login_streaks,
);

module.exports = router;
