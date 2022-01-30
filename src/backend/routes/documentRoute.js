const router = require('express').Router();
const authentication = require('../middleware/authentication');

const privacyPolicy = require('../function/doc/privacyPolicy.js');
const termsAndConditions = require('../function/doc/termsAndConditions.js');

router.post(
	'/acceptPolicy',
	authentication,
	privacyPolicy.acceptPolicy
);

router.get(
	'/didAcceptPolicy',
	authentication,
	privacyPolicy.didAcceptPolicy
);

router.post(
	'/acceptTerms',
	authentication,
	termsAndConditions.acceptTerms
);

router.get(
	'/didAcceptTerms',
	authentication,
	termsAndConditions.didAcceptTerms
);




module.exports = router;
