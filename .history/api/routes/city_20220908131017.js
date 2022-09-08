const router = require('express').Router();
const CityModel = require('../models/City');
const cityController = require('../controllers/CityController');

const validateCityId = async (req, res, next) => {
  const city = await CityModel.findByPk(req.params.cityId);
  if (!state) {
    return res.status(404).json({ error: 'City not found' });
  }
  next();
}

router.get('/city', cityController.index);

router.post('/city', cityController.create);

router.get('/city/:cityId', validateCityId, cityController.show);

router.put('/city/:cityId', validateCityId, cityController.update);

router.delete('/city/:cityId', validateCityId, cityController.delete);

module.exports = router;
