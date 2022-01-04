const router = require('express').Router();
const authentication = require('../middleware/authentication');

const createPomodoroTask = require('../function/pomodoro/createPomodoroTask.js');
const deletePomodoroTask = require('../function/pomodoro/deletePomodoroTask.js');
const getPomodoroTasks = require('../function/pomodoro/getPomodoroTasks.js');
const updatePomodoroTask = require('../function/pomodoro/updatePomodoroTask.js');

router.put('/create_pomodoro_task', authentication, createPomodoroTask.create_pomodoro_task);
router.delete('/delete_pomodoro_task/:task_id', authentication, deletePomodoroTask.delete_pomodoro_task);
router.get('/get_all_pomodoro_tasks', authentication, getPomodoroTasks.get_pomodoro_tasks);
router.post('/update_pomodoro_task/:task_id', authentication, updatePomodoroTask.update_pomodoro_task);

module.exports = router;