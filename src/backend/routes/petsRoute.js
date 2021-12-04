const router = require('express').Router();
const authentication = require('../middleware/authentication');

const getPet = require('../function/pets/getCurrentPet');
const getPets = require('../function/pets/getPets');
const addHealth = require('../function/pets/addHealth');
const checkEvolvability = require('../function/pets/checkEvolvability');
const customizePet = require('../function/pets/customizePet');
const evolvePet = require('../function/pets/evolvePet');
const gainExperience = require('../function/pets/gainExperience');
const loseHealth = require('../function/pets/loseHealth');
const namePet = require('../function/pets/namePet');
const switchPets = require('../function/pets/switchPets');

router.get('/get_pet', authentication, getPet);
router.get('/get_all_pets', authentication, getPets);
router.get('/evolving?', authentication, checkEvolvability);

router.post('/switch_pet', authentication, switchPets);
router.post('/add_health', authentication, addHealth);
router.post('/lose_health', authentication, loseHealth);
router.post('/gain_exp', authentication, gainExperience);
router.post('/name_pet', authentication, namePet);
router.post('/evolve', authentication, evolvePet);
router.post('/customize', authentication, customizePet);

module.exports = router;
