const router = require('express').Router();
const authentication = require('../middleware/authentication');

const evolve = require('../function/pets/evolve');
const getPets = require('../function/pets/getPets');
const health = require('../function/pets/health');
const switchPets = require('../function/pets/switchPets');
const updatePet = require('../function/pets/updatePet');

router.get('/get_current', authentication, getPets.get_current);
router.get('/get_all', authentication, getPets.get_all);
router.get('/evolveCheck', authentication, evolve.evolveCheck);
router.get('/get_health', authentication, health.getHealth);

router.post('/switch_pet', authentication, switchPets);
router.post('/add_health', authentication, health.addHealth);
router.post('/lose_health', authentication, health.loseHealth);
router.post('/gain_exp', authentication, updatePet.gain_exp);
router.post('/name_pet', authentication, updatePet.name);
router.post('/evolve', authentication, evolve.evolve);
router.post('/customize', authentication, updatePet.customize);

module.exports = router;
