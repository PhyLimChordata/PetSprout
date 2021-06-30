const router = require("express").Router();
const authentication = require("../middleware/authentication");

const registerUser = require("../function/user/registerUser");
const loginUser = require("../function/user/loginUser");
const getuserAccount = require("../function/user/getUserAccount");

const {
    registerUserValidator,
    loginUserValidator
} = require("../middleware/express-validator/expressValidator");

// User router
router.post("/register", registerUserValidator,registerUser);
router.post("/login",loginUserValidator,loginUser);
router.get("/user_account_info",getuserAccount);


module.exports = router