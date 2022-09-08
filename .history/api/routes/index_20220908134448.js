const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./city');
const publishers = require('./publisher');
const categories = require('./categorie');
const book = require('./book');

router.use(cors());


router.use(users);
router.use(states);
router.use(cities);
router.use(publishers);
router.use(categories);
router.use(book);

module.exports = router;
