const router = require('express').Router();
const FormatModel = require('../models/Format');
const formatController = require('../controllers/FormatControler');

const validateFormatId = async (req, res, next) => {
  const categorie = await FormatModel.findByPk(req.params.formatId);
  if (!categorie) {
    return res.status(404).json({ error: 'Format not found' });
  }
  next();
}

router.get('/format', formatController.index);

router.post('/format', formatController.create);

router.get('/format/:formatId', validateFormatId, formatController.show);

router.put('/format/:formatId', validateFormatId, formatController.update);

router.delete('/format/:formatId', validateFormatId, formatController.delete);

module.exports = router;
