const router = require('express').Router();
const PublisherModel = require('../models/Publisher');
const publisherController = require('../controllers/PublisherController');

const validatePublisherId = async (req, res, next) => {
  const publisher = await PublisherModel.findByPk(req.params.publisherId);
  if (!publisher) {
    return res.status(404).json({ error: 'Publisher not found' });
  }
  next();
}

router.get('/publisher', publisherController.index);

router.post('/publisher', publisherController.create);

router.get('/publisher/:publisherId', validatePublisherId, publisherController.show);

router.put('/publisher/:publisherId', validatePublisherId, publisherController.update);

router.delete('/publisher/:publisherId', validatePublisherId, publisherController.delete);

module.exports = router;
