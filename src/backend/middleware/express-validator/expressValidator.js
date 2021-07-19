const {check} = require("express-validator")

module.exports.registerUserValidator = [
    check('userName','User Name is empty').not().isEmpty(),
    check('email','E-mail is empty').isEmail(),
    check('password','Passwords needs to contains 6 letter and less than 12').isLength({min:6,max:12})
]

module.exports.loginUserValidator = [
    check('userName','User Name is empty').not().isEmpty()
]

module.exports.userCreateHabitValidator = [
    check('title', 'Title is empty').not().isEmpty()
]

module.exports.markTodoValidator = [
    check('expValue',"Exp value must be provided").isNumeric()
]

module.exports.sendActivationEmailValidator = [
    check('email',"E-mail is empty").isEmail()
]