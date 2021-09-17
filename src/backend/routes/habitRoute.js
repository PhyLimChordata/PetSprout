const router = require('express').Router();
const authentication = require('../middleware/authentication');

const createHabit = require('../function/habit/createHabit');
const markTODO = require('../function/habit/markToDo');
const updateHabit = require('../function/habit/updateHabit');
const deleteHabit = require('../function/habit/deleteHabit');
const showUserHabit = require('../function/habit/showUserHabit');
const showHabit = require('../function/habit/showHabit');

const {
	userCreateHabitValidator,
	markTodoValidator,
} = require('../middleware/express-validator/expressValidator');

router.post(
	'/create_habit',
	authentication,
	createHabit
);
router.put(
	'/mark_TODO/:user_habit_id/:habit_id',
	authentication,
	markTodoValidator,
	markTODO
);
router.put(
	'/change_habit/:user_habit_id/:habit_id',
	authentication,
	userCreateHabitValidator,
	updateHabit
);
router.delete(
	'/delete_habit/:user_habit_id/:habit_id',
	authentication,
	deleteHabit
);
router.get('/show_user_habit/:day', authentication, showUserHabit);
router.get('/show_habit/:user_habit_id/:habit_id', authentication, showHabit);

module.exports = router;
