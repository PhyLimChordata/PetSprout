const cron = require('node-cron');
const notification = require('../user/notification');
/*
 * Create a particular habit and return back the newly created habit.
 */

var jobs = {};

// Adds a new alarm, and returns an id
const add = (alarm, schedule, id, tokens) => {
    var sch = ""
    for (const weekday in schedule) {
        sch += weekday + ","
    }
    sch = sch.slice(0, -1);
    min = alarm.getMinutes();
    hrs = alarm.getHours();

    // Create the scheduled task.
    var task = cron.schedule(min + ' ' + hrs + ' * * *', () => {
        console.log("Alarm Added.");
        console.log("Weekdays: " + sch);
        console.log("Hour: " + hrs);
        console.log("Minute: " + min);
        notification(tokens, "Alarm Alarm! " + hrs + ":" + min +
                     " for these weekdays: " + sch, {});
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
    return
}

exports.add = add;
exports.remove = remove;