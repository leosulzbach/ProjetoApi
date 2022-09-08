const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./city');

router.use(cors());


router.use(users);
router.use(states);
router.use(cities);

module.exports = router;
