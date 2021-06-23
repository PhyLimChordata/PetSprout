const router = require('express').Router()
let User = require('../models/UserSchema')
const {check, validationResult} = require("express-validator")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register',
[
    check('userName','Name is empty').not().isEmpty(),
    check('email','E-mail is empty').isEmail(),
    check('password','Passwords needs to contains 6 letter and less than 10').isLength({min:6,max:12})
],
async(req,res)=>{
    try{
        let{userName,email,password}=req.body
        let errors = validationResult(req)

        if(!error.isEmpty){
            return res.status(400).json({error:error.array()})
        }

        let user = await User.findOne({email}).select('-password')
        if(user){
            return res.statu(401).send("user has already been created")
        }

        let fetchUserName=await User.findOne({userName}).send('-password')
        if(fetchUserName===userName){
            return res.status(401).send("userName exists")
        }

        let newUser=new User({
            userName,
            email,
            password
        })

        // hashedpassword
        const salt = await bcryptjs.genSalt(10)
        let hashedPassword = await bcryptjs.hash(password,salt)
        newUser.password = hashedPassword

        await newUser.save();
        const payload={
            user:{
                id:newUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.JSONWEBTOKEN,
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err
                res.json({token})
            }
        )
        res.send('User is created')
    }
    catch(error){
        console.log(error.message)
        return res.status(500).send("Server error")
    }
})


module.exports = router