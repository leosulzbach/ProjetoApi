const router = require('express').Router();
const BookModel = require('../models/Book');
const bookController = require('../controllers/BookController');

const validateBookId = async (req, res, next) => {
  const book = await BookModel.findByPk(req.params.bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  next();
}

router.get('/books', bookController.index);

router.post('/books', bookController.create);

router.get('/books/:bookId', validateBookId, bookController.show);

router.put('/books/:bookId', validateBookId, bookController.update);

router.delete('/books/:bookId', validateBookId, bookController.delete);

module.exports = router;
