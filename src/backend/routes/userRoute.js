const router = require('express').Router();
const authentication = require('../middleware/authentication');

const registerUser = require('../function/user/registerUser');
const loginUser = require('../function/user/loginUser');
const getUserAccount = require('../function/user/getUserAccount');
const sendReport = require('../function/user/sendReport');

const {
	registerUserValidator,
	loginUserValidator,
	sendActivationEmailValidator,
	sendReportValidator,
} = require('../middleware/express-validator/expressValidator');

// User router
router.post('/register', registerUserValidator, registerUser.user_regist);
router.get('/activation/:code/:email', registerUser.user_activation);
router.post(
	'/send_activate_email',
	sendActivationEmailValidator,
	registerUser.send_activate_email
);
router.post('/login', loginUserValidator, loginUser);
router.post(
	'/sendBugReport',
	authentication,
	sendReportValidator,
	sendReport.sendBugReport
);
router.post(
	'/sendFeedbackReport',
	authentication,
	sendReportValidator,
	sendReport.sendFeedbackReport
);

router.get('/viewAccount', getUserAccount.viewAccount);

router.put('/modifyAccount', getUserAccount.modifyAccount);

module.exports = router;
