const cron = require('node-cron');
const notification = require('../user/notification');
const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
/*
 * Create a particular habit and return back the newly created habit.
 */

var jobs = {};

/**
 * Given a userId and analyzeId (used to identify which habit), schedule all of the 
 * alarms.
 * @param {*} userId 
 * @param {*} analyzeId 
 * @returns 
 */
const schedule = async (userId, analyzeId) => {
    // Grab the list of alarms now it has ids associated.
    let updatedUserHabit = await Habit.findOne({ user: userId });
    if (!updatedUserHabit)
        return res
            .status(404)
            .json({ error: ["User's habit information not found"] });
    var updatedHabit = updatedUserHabit.habitList.find(
        (habit) => habit.analyze.toString() === analyzeId.toString(),
    );
    updatedAlarmList = updatedHabit.alarm

    // Grab the users ExpoPushTokens
    let userTokens = await User.findById(userId).select('-password');
    tokens = userTokens.tokens

    // Schedule alarms for the user.
    for (const a in updatedAlarmList) {
        elem = updatedAlarmList[a];
        add(elem.date, updatedHabit.schedule, elem._id, tokens)
    }
}

/**
 * Given a userId and analyzeId (used to identify which habit), unschedule all of the 
 * alarms.
 * @param {*} userId 
 * @param {*} analyzeId 
 * @returns 
 */
 const unschedule = async (userId, analyzeId) => {
     console.log(`Unscheduling for ${userId}`)
    // Grab the list of alarms now it has ids associated.
    let updatedUserHabit = await Habit.findOne({ user: userId });
    if (!updatedUserHabit)
        return res
            .status(404)
            .json({ error: ["User's habit information not found"] });
    var updatedHabit = updatedUserHabit.habitList.find(
        (habit) => habit.analyze.toString() === analyzeId.toString(),
    );
    updatedAlarmList = updatedHabit.alarm

    // Unschedule alarms for the user.
    for (const a in updatedAlarmList) {
        elem = updatedAlarmList[a];XPathEvaluator
        console.log(`Alarm Removed ${elem._id}`)
        remove(elem._id);
    }
}

// Adds a new alarm, and returns an id
const add = (alarm, schedule, id, tokens) => {
    var sch = ""
    for (const weekday in schedule) {
        sch += weekday + ","
    }
    sch = sch.slice(0, -1);
    minutes = alarm.getMinutes();
    hours = alarm.getHours();

    // Formatted hours/minutes
    var ampm = hours >= 12 ? 'pm' : 'am';
    hrs = hours % 12;
    hrs = hrs ? hrs : 12; // ensures that 00:00 => 12:00
    min = minutes < 10 ? '0' + minutes : minutes;

    console.log(`Alarm for ${hrs}:${min}${ampm}, days: ${sch}, CREATED: ${id}`);

    // Create the scheduled task.
    var task = cron.schedule(minutes + ' ' + hours + ' * * *', () => {
        
        console.log(`Alarm for ${hrs}:${min}${ampm}, days: ${sch}, SENT: ${id}`);

        notification(tokens, `PetSprout Alarm for ${hrs}:${min}${ampm}. Configured for these days: ${sch}`);
    }, {
        scheduled: true
        // timezone: ""
    });

    // Add the task to the collections of total jobs.
    jobs[id] = task;

    task.start();
}

// Stops a current cron job, given an id
const remove = async (id) => {
    console.log(jobs[id]);
    (jobs[id]).stop();
}

exports.schedule = schedule;
exports.unschedule = unschedule;