const router = require('express').Router();
const authentication = require('../middleware/authentication');

const evolve = require('../function/pets/evolve');
const getPets = require('../function/pets/getPets');
const health = require('../function/pets/health');
const switchPets = require('../function/pets/switchPets');
const updatePet = require('../function/pets/updatePet');

router.get(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/get_current', authentication, getPets.get_current);
router.get(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/get_all', authentication, getPets.get_all);
router.get(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/evolveCheck', authentication, evolve.evolveCheck);

router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/switch_pet', authentication, switchPets);
router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/add_health', authentication, health.addHealth);
router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/lose_health', authentication, health.loseHealth);
router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/gain_exp', authentication, updatePet.gain_exp);
router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/name_pet', authentication, updatePet.name);
router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/evolve', authentication, evolve.evolve);
router.post(
    // #swagger.description = 'DESCRIPTION: Filler Description here.'
	// #swagger.summary = 'SUMMARY: Filler Summary Here.'
	// #swagger.tags = ['Pets']
    '/customize', authentication, updatePet.customize);

module.exports = router;
