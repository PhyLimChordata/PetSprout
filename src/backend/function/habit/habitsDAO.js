const Habit = require('../../schemas/habitSchema');
const ObjectID = require("mongodb").ObjectID

const logError = (error_msg) => { console.log("    > " + error_msg)}

/*
 *  Given user_id, returns the habits for the user if exists.
 *  Return: JSON
 *  {
 *     result: {},
 *     msg: ""
 *  }
 * if error exists, error returned as string and result returns null.
 * o/w error as "success", result as { result: {...} }
 */
async function getHabits(user_id) {
    try {
        let userHabit = await Habit.findOne({ user: user_id });
        if(userHabit) {
            return {
                result: userHabit,
                msg: "success"
            };
        } else {
            let error_msg = `Habits for user id ${user_id} not found`
            logError(error_msg);
            return {
                result: null,
                msg: error_msg
            };
        }
    } catch (error) {
        let error_msg = `Server error getting habits for user id ${user_id} : ${error}`
        logError(error_msg)
        return {
            result: null,
            msg: error_msg
        };
    }
}

/*
 *  Given user_id, habit_id, newMissingValue, updates the habit's missed times
 *  Return: JSON
 *  {
 *     msg: ""
 *  }
 * if error exists, error returned as string, otherwise "success"
 */
async function updateHabitMissing(user_id, habit_id, newMissingValue) {
    console.log(`Updating 'missing' for habit ${habit_id} for user id ${user_id} to ${newMissingValue}:`)
    // Input sanitization
    if(typeof newMissingValue !== "number") {
        var error_msg = `Error updating 'missing' for habit ${habit_id} for user id ${user_id} : newMissingValue is not a number.`
        logError(error_msg)
        return {
            msg: error_msg
        }
    } else if(newMissingValue < 0) {
        var error_msg = `Error updating 'missing' for habit ${habit_id} for user id ${user_id} : newMissingValue cannot be negative.`
        logError(error_msg)
        return {
            msg: error_msg
        }
    }
    try {
        let userHabit = await getHabits(user_id);
        if(userHabit.msg == "success") {
            let habits = userHabit.result.habitList
            for(let habit of habits) {
                if(habit._id.equals(habit_id)) {
                    habit.missing = newMissingValue;
                    // If missed more than once, continuous must be 0 - For database consistency
                    if(newMissingValue > 0) {
                        habit.continuous = 0;
                    }
                    userHabit.result.save();
                    return { "msg": "success" }
                }
            }
            var error_msg = `Error updating 'missing' for habit ${habit_id} for user id ${user_id} : habit ${habit_id} not found`
            logError(error_msg)
            return {
                msg: error_msg
            }
        } else {
            logError(userHabit.msg)
            return {
                msg: userHabit.msg
            }
        }
    } catch (error) {
        let error_msg = `Server error updating 'missing' for habit ${habit_id} for user id ${user_id} : ${error}`
        logError(error_msg)
        return {
            msg: error_msg
        };
    }
}

/*
 *  Given user_id, habit_id, newSignInDate, updates the habit's nextSignInDate
 *  Return: JSON
 *  {
 *     msg: ""
 *  }
 * if error exists, error returned as string, otherwise "success"
 */
async function updateNextSignInDate(user_id, habit_id, newSignInDate) {
    console.log(`Updating 'nextSignInDate' for habit ${habit_id} for user id ${user_id} to ${newSignInDate}:`)
    try {
        var date = new Date(newSignInDate);
    } catch (error) {
        var error_msg = `Error updating 'nextSignInDate' for habit ${habit_id} for user id ${user_id} : ${error}`
        logError(error_msg)
        return {
            msg: error_msg
        }
    }
    try {
            let userHabit = await getHabits(user_id);
            if(userHabit.msg == "success") {
                let habits = userHabit.result.habitList
                for(let habit of habits) {
                    if(habit._id.equals(habit_id)) {
                        habit.nextSignInDate = newSignInDate;
                        userHabit.result.save();
                        return { "msg": "success" }
                    }
                }
                var error_msg = `Error updating 'nextSignInDate' for habit ${habit_id} for user id ${user_id} : habit ${habit_id} not found`
                logError(error_msg)
                return {
                    msg: error_msg
                }
            } else {
                logError(userHabit.msg)
                return {
                    msg: userHabit.msg
                }
            }
    } catch(error) {
            let error_msg = `Server error updating 'nextSignInDate' for habit ${habit_id} for user id ${user_id} : ${error}`
            logError(error_msg)
            return {
                msg: error_msg
            };
    }
}

exports.getHabits = getHabits;
exports.updateHabitMissing = updateHabitMissing;
exports.updateNextSignInDate = updateNextSignInDate;