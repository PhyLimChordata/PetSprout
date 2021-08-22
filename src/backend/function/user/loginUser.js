const {validationResult} = require("express-validator");
const Habit = require("../../schemas/HabitSchema");
const User = require("../../schemas/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = async (req,res) => {
    try {
        // email for login
        let{userName,password,date} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        let user = await User.findOne({userName});
        if(!user)
            return res.status(404).json("User has not been created");

        if(user.status===0) 
            return res.status(400).json("User hasn't been activated");

        let matching=await bcryptjs.compare(password,user.password);
        if(!matching)
            return res.status(401).json("Wrong password");
            
        if(user.lastlogin!==null){
            let lastLoginYear = user.lastlogin.getFullYear();
            let lastLoginMonth = user.lastlogin.getMonth();
            let lastLoginDate = user.lastlogin.getDate();

            // var current = new Date();
            var current = new Date(date);
            var currentYear = current.getFullYear();
            var currentMonth = current.getMonth();
            var currentDate = current.getDate();
            if( lastLoginDate !== currentDate || 
                lastLoginMonth !== currentMonth ||
                lastLoginYear !== currentYear){
                    let userHabit = await Habit.findOne({user:user._id});
                    if(userHabit.habitList!==null){
                        for(const habit of userHabit.habitList){
                            habit.todo = 0;
                        }
                    } 
                    userHabit.save();
                }
        }

        user.lastlogin = new Date();
        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };
        jwt.sign(
            payload,
            process.env.JSONWEBTOKEN,
            {expiresIn: 3600},
            (err,token) =>{
                if(err) throw err
                res.status(200).json({"token": token});
            }
        );   

    } catch (error) {
        console.error(error);
        return res.status(500).json("server error");
    }
}