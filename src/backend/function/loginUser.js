const {validationResult} = require("express-validator")
const User = require("../schemas/UserSchema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


module.exports = async (req,res) => {
    try {
        let{userName,password} = req.body

        let errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})

        let user = await User.findOne({userName})
        if(!user)
            return res.status(404).send("User has not been created")

        let matching=await bcryptjs.compare(password,user.password)
        if(!matching)
            return res.status(401).send("Wrong password")

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JSONWEBTOKEN,
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
}