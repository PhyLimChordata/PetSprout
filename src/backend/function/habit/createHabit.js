const Habit = require("../../schemas/HabitSchema");
const User = require("../../schemas/UserSchema");
const {validationResult} = require("express-validator");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns
 * 
 * Create a particular habit and return back the newly created habit. 
 */
module.exports = async(req,res) => {
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({error:error.array()});

        let {title,description,reason,schedule,repeat,times,alarm,tag}=req.body;

        let user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json("User could not found");
         
        let userHabit = await Habit.findById(req.params.user_habit_id);
        if(!userHabit) return res.status(404).json("User's habit could not found");

        // setting default
        if(schedule===""&&repeat==="") schedule = "1";
        if(times==="") times = "1";
        if(alarm==="") alarm = "12:00";
        
        let newHabit = {
            title,
            description,
            reason,
            schedule,
            repeat,
            times,
            alarm,
            tag
        };

        userHabit.habitList.push(newHabit);
        await userHabit.save();
        res.json(newHabit);

    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
    }
}