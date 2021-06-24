const {check} = require("express-validator")

module.exports.registerUserValidator = [
    check('userName','User Name is empty').not().isEmpty(),
    check('email','E-mail is empty').isEmail(),
    check('password','Passwords needs to contains 6 letter and less than 12').isLength({min:6,max:12})
]

module.exports.loginUserValidator = [
    check('userName','User Name is empty').not().isEmpty()
]