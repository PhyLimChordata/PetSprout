const router = require('express').Router();
const authentication = require('../middleware/authentication');

const privacyPolicy = require('../function/doc/privacyPolicy.js');
const termsAndConditions = require('../function/doc/termsAndConditions.js');

router.post(
	'/acceptPolicy',
	authentication,
	privacyPolicy.acceptPolicy
);

router.post(
	'/acceptTerms',
	authentication,
	termsAndConditions.acceptTerms
);

module.exports = router;
