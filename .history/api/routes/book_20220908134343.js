const router = require('express').Router();
const BookModel = require('../models/Book');
const bookController = require('../controllers/BookController');

const validateBookId = async (req, res, next) => {
  const book = await BookModel.findByPk(req.params.bookId);
  if (!state) {
    return res.status(404).json({ error: 'Book not found' });
  }
  next();
}

router.get('/book', bookController.index);

router.post('/book', bookController.create);

router.get('/book/:bookId', validateBookId, bookController.show);

router.put('/book/:bookId', validateBookId, bookController.update);

router.delete('/book/:bookId', validateBookId, bookController.delete);

module.exports = router;
