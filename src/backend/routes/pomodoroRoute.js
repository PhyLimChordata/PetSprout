const router = require('express').Router();
const authentication = require('../middleware/authentication');

const createPomodoroTask = require('../function/pomodoro/createPomodoroTask');
const deletePomodoroTask = require('../function/pomodoro/deletePomodoroTask');
const getPomodoroTasks = require('../function/pomodoro/getPomodoroTasks');
const updatePomodoroTask = require('../function/pomodoro/updatePomodoroTask');
const selectPomodoroTask = require('../function/pomodoro/selectPomodoroTask');

router.put('/create_pomodoro_task', authentication, createPomodoroTask.create_pomodoro_task);
router.delete('/delete_pomodoro_task/:task_id', authentication, deletePomodoroTask.delete_pomodoro_task);
router.get('/get_all_pomodoro_tasks', authentication, getPomodoroTasks.get_pomodoro_tasks);
router.post('/update_pomodoro_task/:task_id', authentication, updatePomodoroTask.update_pomodoro_task);
router.post('/select_pomodoro_task/:task_id', authentication, selectPomodoroTask.select_pomodoro_task);

module.exports = router;