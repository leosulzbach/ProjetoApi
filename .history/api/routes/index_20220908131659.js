const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./city');
const publishers = require('./publisher');

router.use(cors());


router.use(users);
router.use(states);
router.use(cities);
router.use(publishers);

module.exports = router;
