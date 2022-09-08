const router = require('express').Router();
const CategorieModel = require('../models/Categorie');
const categorieController = require('../controllers/CategorieControler');

const validateCategorieId = async (req, res, next) => {
  const city = await CityModel.findByPk(req.params.cityId);
  if (!state) {
    return res.status(404).json({ error: 'City not found' });
  }
  next();
}

router.get('/city', categorieController.index);

router.post('/city', categorieController.create);

router.get('/city/:cityId', validateCategorieId, categorieController.show);

router.put('/city/:cityId', validateCategorieId, categorieController.update);

router.delete('/city/:cityId', validateCategorieId, categorieController.delete);

module.exports = router;
