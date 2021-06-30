const Habit = require("../../schemas/HabitSchema");
const User = require("../../schemas/UserSchema");
const {validationResult} = require("express-validator");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * 
 * Mark todo, modify exp value and return back the user's habit after modification.
 */

module.exports = async(req,res)=>{
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({error:error.array()});

        let {expValue} = req.body;

        let user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json("User could not found");

        let userHabit = await Habit.findById(req.params.user_habit_id);
        if(!userHabit) return res.status(404).json("User's habits could not find");

        const habitFromDB = userHabit.habitList.find(
            (habit) => habit._id.toString() === req.params.habit_id.toString()
        );
        if(!habitFromDB) return res.status(404).json("Habit could not find in user's habits");

        let numberOfFinish = habitFromDB.todo;
        habitFromDB.todo = numberOfFinish + 1;
        userHabit.expValue = expValue;

        await userHabit.save();
        res.json(userHabit);
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error")
    }
}