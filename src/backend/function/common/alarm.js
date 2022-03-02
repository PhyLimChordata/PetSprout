const cron = require('node-cron');
const notification = require('./notification');
const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const Pets = require('../../schemas/petsSchema');

var jobs = {};

/**
 * Reschedules all alarms on server startup.
 */
const startupAlarms = async () => {
    for await (const u of User.find()) {
        console.log(`[Alarm Startup] Scheduling Alarms for ${u._id}`)
        for await (const h of Habit.findOne({user: u._id })) {
            for (const habit of h.habitList) {
                console.log(`[Alarm Startup] Habit Alarms Scheduled: ${habit.title}`)
                scheduleHabitAlarms(u._id, habit.analyze);
            }
        }
      }
}

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
    if (!user) {
        return {'status': 404,
                'error': "User's information not found."}
    }
    var userHabit = user.habitList.find(
        (habit) => habit.analyze.toString() === analyzeId.toString(),
    );
    
    if (!userHabit) {
        return {'status': 404,
                'error': "User's habit information not found"}
    }
    updatedAlarmList = userHabit.alarm

    // Grab Pet Name (default: "")
    petName = "";
    let userPets = await Pets.findOne({ user : userId });
    if(userPets) {
        petName = userPets.currentPet.name;
    }

    // Grab the users ExpoPushTokens
    let userTokens = await User.findById(userId).select('-password');
    tokens = userTokens.tokens

    // Schedule alarms for the user.
    for (const a in updatedAlarmList) {
        elem = updatedAlarmList[a];
        info = {'alarm': elem.date,
                'timezone': elem.timezone,
                'id': elem._id,
                'tokens': tokens,
                'schedule': userHabit.schedule,
                'habitName': userHabit.title,
                'petName': petName}
        schedule(info)
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
    // Grab the list of alarms now it has ids associated.
    let user = await Habit.findOne({ user: userId });
    if (!user) {
        return {'status': 404,
                'error': "User's information not found."}
    }
    var userHabit = user.habitList.find(
        (habit) => habit.analyze.toString() === analyzeId.toString(),
    );

    if (!userHabit) {
        return {'status': 404,
                'error': "User's habit information not found"}
    }
    updatedAlarmList = userHabit.alarm

    // Unschedule alarms for the user.
    for (const a in updatedAlarmList) {
        elem = updatedAlarmList[a];
        remove(elem._id);
    }
}

// Adds a new alarm, and returns an id
const schedule = async (info) => {
    // Destructure input
    const {alarm, timezone, schedule, habitName, petName, id, tokens} = info
    // Formatted weekdays into a csv format.
    var sch = ""
    for (const weekday in schedule) {
        sch += schedule[weekday] + ","
    }
    sch = sch.slice(0, -1);

    // Get Hours in given timezone.
    var date = new Date(alarm);
    var options = {hour: '2-digit', hour12: false, timeZone: timezone}
    var hours = date.toLocaleString('en-US', options);
    var localizedHours = parseInt(hours);
    if(localizedHours === 24){
        console.log(`Hour: 25 detected. schedule() parameters: ${JSON.stringify(info)}`);
        localizedHours = 0;
    }

    // Get Minutes in a given timezone.
    var date = new Date(alarm);
    var options = {minute: '2-digit', timeZone: timezone}
    var localizedMinutes = date.toLocaleString('en-US', options);
    
    // Formatting
    var isPm = localizedHours >= 12 ? 'pm' : 'am';
    var displayHours = localizedHours % 12;
    displayHours = displayHours ? displayHours : 12; // ensures that 00:00 => 12:00
    displayMinutes = localizedMinutes < 10 ? '0' + localizedMinutes : localizedMinutes;

    // Add the task to the collections of total jobs. All of these variables
    // are required to be saved since when the cron job executes the variables might be
    // altered.
    var job_entry = {'h': displayHours,
                     'm': displayMinutes,
                     'sch': sch,
                     'isPm': isPm,
                     'tz': timezone,
                     'petName': petName,
                     'habitName': habitName,
                      'tokens': tokens};
    jobs[id] = job_entry;
    
    // Cron Pattern. Repeat every {sch} weekdays, at hour:minute.
    pattern = `${localizedMinutes} ${localizedHours} * * ${sch}`

    if(!cron.validate(pattern)) {
        console.log(`Cron Validation Error. schedule() parameters: ${JSON.stringify(info)}`);
        console.error(`Server Error: Invalid Cron Pattern: ${pattern}`);
        return;
    }

    // Create the scheduled task.
    // alarmLog(id, "CREATED")
    try {
        var task = cron.schedule(`${localizedMinutes} ${localizedHours} * * ${sch}`, () => {
            var entry = jobs[id];
            var displayTime = `${entry['h']}:${entry['m']}${entry['isPm']}`
            var msg = `Your pet ${entry['petName']} is reminding you to complete the habit '${entry['habitName']}'` + 
                      ` at ${displayTime}!`

            notification(entry['tokens'], msg);
            // alarmLog(id, "SENT")
        }, {
            scheduled: true,
            timezone: timezone
        });
        if (!task) {
            console.error("Server Error: Failed to create cron job.")
        }
    } catch (error) {
		console.error(`CRON JOB CREATION ERROR: ${error}`);
        return;
	}

    // Add the task to the collections of total jobs.
    job_entry['task'] = task;
    task.start();
}

// Stops a current cron job, given an id
const remove = async (id) => {
    // alarmLog(id, "REMOVE")
    try {    
        (jobs[id]['task']).stop();
    } catch (error) {
        console.error(error);
    }
    delete jobs[id];
}

const alarmLog = (id, method) => {
    var displayTime = `${jobs[id]['h']}:${jobs[id]['m']}${jobs[id]['isPm']}`;
    console.log(`${method} alarm for ${displayTime} in ${jobs[id]['tz']}, days: ${jobs[id]['sch']}, id: ${id}`);
}
exports.scheduleHabitAlarms = scheduleHabitAlarms;
exports.unscheduleHabitAlarms = unscheduleHabitAlarms;
exports.startup = startupAlarms;