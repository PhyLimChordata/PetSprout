const router = require('express').Router();
const authentication = require('../middleware/authentication');

const createHabit = require('../function/habit/createHabit');
const markTODO = require('../function/habit/markToDo');
const updateHabit = require('../function/habit/updateHabit');
const deleteHabit = require('../function/habit/deleteHabit');
const showUserHabit = require('../function/habit/showUserHabit');
const showAllUserHabit = require('../function/habit/showAllUserHabits');
const showHabit = require('../function/habit/showHabit');

const {
	markTodoValidator,
} = require('../middleware/express-validator/expressValidator');

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/create_habit',
	authentication,
	createHabit
);
router.put(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/mark_TODO/:user_habit_id/:habit_id',
	authentication,
	markTodoValidator,
	markTODO,
);
router.put(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/change_habit/:user_habit_id/:habit_id',
	authentication,
	updateHabit,
);
router.delete(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/delete_habit/:user_habit_id/:habit_id',
	authentication,
	deleteHabit,
);
router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/show_user_habit/:day',
	authentication,
	showUserHabit
);
router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/show_all_user_habit',
	authentication,
	showAllUserHabit);
router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Habit']
	'/show_habit/:user_habit_id/:habit_id',
	authentication,
	showHabit);

module.exports = router;
