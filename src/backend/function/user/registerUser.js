const {validationResult} = require("express-validator");
const User = require("../../schemas/UserSchema");
const Habit = require("../../schemas/HabitSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = async(req,res) => {
    try{
        let{userName,email,password}=req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({error:error.array()});

        if(userName === "") res.status(400).json("username is required");
        if(email === "") res.status(400).json("email is required");
        
        let user = await User.findOne({email}).select('-password');
        if(user)
            return res.status(401).json("User exists");

        let fetchUserName = await User.findOne({userName}).select('-password');
        if(fetchUserName === userName)
            return res.status(401).json("User Name exists");

        let newUser=new User({
            userName,
            email,
            password,
            lastlogin: null
        });

        // hashedpassword (security)
        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password,salt);
        newUser.password = hashedPassword;

        //save to the database
        await newUser.save();

        // create user habit 
        let newUserHabit = new Habit({
            user:newUser._id,
        });

        await newUserHabit.save();

        const payload={
            user:{
                id:newUser._id
            }
        };

        jwt.sign(
            payload,
            process.env.JSONWEBTOKEN,
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err
                res.json({token})
            }
        );
    }
    catch(error){
        console.log(error);
        return res.status(500).json("Server error");
    }
}