const cors = require('cors');
const router = require('express').Router();
const users = require('./users');

router.use(cors());

router.use(users);

module.exports = router;
