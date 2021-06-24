const router = require("express").Router()
const authentication = require("../middleware/authentication")

const registerUser = require("../function/registerUser")
const loginUser = require("../function/loginUser")

const {
    registerUserValidator,
    loginUserValidator
} = require("../middleware/express-validator/expressValidator")

router.post("/register", registerUserValidator,registerUser)
router.post("/login",loginUserValidator,loginUser)

module.exports = router