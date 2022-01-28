const cron = require('node-cron');
const notification = require('./notification');
const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');

var jobs = {};

/**
 * Given a userId and analyzeId (used to identify which habit), schedule all of the 
 * alarms.
 * @param {*} userId 
 * @param {*} analyzeId 
 * @returns 
 */
const scheduleHabitAlarms = async (userId, analyzeId) => {
    // Grab the list of alarms now it has ids associated.
    let user = await Habit.findOne({ user: userId });
    if (!user)
        return res
            .status(404)
            .json({ error: ["User's information not found"] });
    var userHabit = user.habitList.find(
        (habit) => habit.analyze.toString() === analyzeId.toString(),
    );
    
    if (!userHabit)
        return res
            .status(404)
            .json({ error: ["User's habit information not found"] });
    updatedAlarmList = userHabit.alarm

    // Grab the users ExpoPushTokens
    let userTokens = await User.findById(userId).select('-password');
    tokens = userTokens.tokens

    // Schedule alarms for the user.
    for (const a in updatedAlarmList) {
        elem = updatedAlarmList[a];
        console.log(`Date String Received in alarm.js: ${elem.date}`)
        schedule(elem.date, userHabit.schedule, elem._id, tokens)
    }
}

/**
 * Given a userId and analyzeId (used to identify which habit), unschedule all of the 
 * alarms.
 * @param {*} userId 
 * @param {*} analyzeId 
 * @returns 
 */
 const unscheduleHabitAlarms = async (userId, analyzeId) => {
     console.log(`Unscheduling for ${userId}`)
    // Grab the list of alarms now it has ids associated.
    let user = await Habit.findOne({ user: userId });
    if (!user)
        return res
            .status(404)
            .json({ error: ["User's habit information not found"] });
    var userHabit = user.habitList.find(
        (habit) => habit.analyze.toString() === analyzeId.toString(),
    );

    if (!userHabit)
        return res
            .status(404)
            .json({ error: ["User's habit information not found"] });
    updatedAlarmList = userHabit.alarm

    // Unschedule alarms for the user.
    for (const a in updatedAlarmList) {
        elem = updatedAlarmList[a];
        remove(elem._id);
    }
}

// Adds a new alarm, and returns an id
const schedule = (alarm, schedule, id, tokens) => {
    
    // Formatted hours/minutes/weekdays
    var sch = ""
    for (const weekday in schedule) {
        sch += schedule[weekday] + ","
    }
    sch = sch.slice(0, -1);
    minutes = alarm.getMinutes();
    hours = alarm.getHours();
    var isPm = hours >= 12 ? 'pm' : 'am';
    hrs = hours % 12;
    hrs = hrs ? hrs : 12; // ensures that 00:00 => 12:00
    min = minutes < 10 ? '0' + minutes : minutes;
    
    // Add the task to the collections of total jobs. All of these variables
    // are required to be saved since when the cron job executes
    var job_entry = {};
    job_entry['id'] = id;
    job_entry['hrs'] = hrs;
    job_entry['min'] = min;
    job_entry['sch'] = sch;
    job_entry['isPm'] =isPm;
    job_entry['tokens'] = tokens;
    jobs[id] = job_entry;
    
    // Create the scheduled task.
    console.log(`CREATED Alarm for ${hrs}:${min}${isPm}, days: ${sch}, id: ${id}`);
    try {
        var task = cron.schedule(`${minutes} ${hours} * * ${sch}`, () => {
            console.log(`SENT Alarm for ${jobs[id]['hrs']}:${jobs[id]['min']}${jobs[id]['isPm']}, days: ${jobs[id]['sch']}, id: ${id}`);
            notification(jobs[id]['tokens'], `PetSprout Alarm for ${jobs[id]['hrs']}:${jobs[id]['min']}${jobs[id]['isPm']}. Configured for these days: ${jobs[id]['sch']}`);
        }, {
            scheduled: true
            // timezone: ""
        });
        if (!task)
            return res
                .status(500)
                .json({ error: ["Server Error: Failed to create cron job."]});
    } catch (error) {
		console.log(error);
		return res.status(500).json('server error');
	}

    // Add the task to the collections of total jobs.
    job_entry['task'] = task;
    task.start();
}

// Stops a current cron job, given an id
const remove = async (id) => {
    console.log(jobs[id]);
    console.log(`REMOVED Alarm for ${jobs[id]['hrs']}:${jobs[id]['min']}${jobs[id]['isPm']}, days: ${jobs[id]['sch']}, id: ${jobs[id]['id']}`);
    try {    
        (jobs[id]['task']).stop();
    } catch (error) {
        console.log(error);
		return res.status(500).json('server error');
    }
    delete jobs[id];
}

exports.scheduleHabitAlarms = scheduleHabitAlarms;
exports.unscheduleHabitAlarms = unscheduleHabitAlarms;