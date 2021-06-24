const {validationResult} = require("express-validator")
const User = require("../schemas/UserSchema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


module.exports = async(req,res) => {
    try{
        let{userName,email,password}=req.body
      
        let errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({error:error.array()})

        let user = await User.findOne({email}).select('-password')
        if(user)
            return res.statu(401).send("User exists")

        let fetchUserName = await User.findOne({userName}).send('-password')
        if(fetchUserName===userName)
            return res.status(401).send("User Name exists")

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

        res.send('User is created successfully')
    }
    catch(error){
        console.log(error.message)
        return res.status(500).send("Server error")
    }
}