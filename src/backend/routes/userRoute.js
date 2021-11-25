const router = require('express').Router();
const authentication = require('../middleware/authentication');

const registerUser = require('../function/user/registerUser');
const loginUser = require('../function/user/loginUser');
const getUserAccount = require('../function/user/getUserAccount');
const sendReport = require('../function/user/sendReport');
const forgetPassword = require('../function/user/forgetPassword');

const {
	registerUserValidator,
	loginUserValidator,
	sendActivationEmailValidator,
	sendReportValidator,
	resetPasswordValidator,
} = require('../middleware/express-validator/expressValidator');

// User router
router.post('/register', registerUserValidator, registerUser.user_regist);

router.get('/activation/:code/:email', registerUser.user_activation);

router.post(
	'/send_activate_email',
	sendActivationEmailValidator,
	registerUser.send_activate_email,
);

router.post('/login', loginUserValidator, loginUser);

router.post(
	'/sendBugReport',
	authentication,
	sendReportValidator,
	sendReport.sendBugReport,
);

router.post(
	'/sendFeedbackReport',
	authentication,
	sendReportValidator,
	sendReport.sendFeedbackReport,
);

router.get('/viewAccount', authentication, getUserAccount.viewAccount);

router.put('/modifyAccount', authentication, getUserAccount.modifyAccount);

router.post('/pending_password', forgetPassword.pending_password);

router.get('/reset_password/:code/:email', forgetPassword.reset_password);

router.post(
	'/check_user',
	resetPasswordValidator,
	forgetPassword.checkUserExistl,
);

module.exports = router;
