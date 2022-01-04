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
router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/register', registerUserValidator, registerUser.user_regist);

router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/activation/:code/:email', registerUser.user_activation);

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/send_activate_email',
	sendActivationEmailValidator,
	registerUser.send_activate_email,
);

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/login', loginUserValidator, loginUser);

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/sendBugReport',
	authentication,
	sendReportValidator,
	sendReport.sendBugReport,
);

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/sendFeedbackReport',
	authentication,
	sendReportValidator,
	sendReport.sendFeedbackReport,
);

router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/viewAccount', authentication, getUserAccount.viewAccount);

router.put(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/modifyAccount', authentication, getUserAccount.modifyAccount);

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/pending_password', forgetPassword.pending_password);

router.get(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/reset_password/:code/:email', forgetPassword.reset_password);

router.post(
	// #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['User']
	'/check_user',
	resetPasswordValidator,
	forgetPassword.checkUserExistl,
);

module.exports = router;
