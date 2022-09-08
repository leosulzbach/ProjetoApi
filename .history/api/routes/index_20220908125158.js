const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');

router.use(cors());


router.use(users);
router.use(states);

module.exports = router;
