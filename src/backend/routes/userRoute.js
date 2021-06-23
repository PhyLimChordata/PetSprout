const router = require('express').Router()
let User = require('../schemas/UserSchema')
const {check, validationResult} = require("express-validator")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register',
[
    check('userName','Name is empty').not().isEmpty(),
    check('email','E-mail is empty').isEmail(),
    check('password','Passwords needs to contains 6 letter and less than 12').isLength({min:6,max:12})
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

        // hashedpassword (security)
        const salt = await bcryptjs.genSalt(10)
        let hashedPassword = await bcryptjs.hash(password,salt)
        newUser.password = hashedPassword

        //save to the database
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

router.post("/login", 
[
    check('email','E-mail is empty').isEmail(),
],
async (req,res) => {
    try {
        let{email,password} = req.body
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        let user = await User.findOne({email})
        if(!user){
            return res.status(404).send("User has not been created yet")
        }

        let matching=await bcryptjs.compare(password,user.password)
        if(!matching){
            return res.status(401).send("password doesn't match")
        }

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            config.get('jsonWebTokenSecret'),
            {expiresIn: 3600},
            (err,token) =>{
                if(err) throw err
                res.json({token})
            }
        )   

    } catch (error) {
        console.error(error)
        return res.status(500).send("server error")
    }
})

module.exports = router