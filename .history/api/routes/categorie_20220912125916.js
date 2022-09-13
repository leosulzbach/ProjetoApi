const router = require('express').Router();
const CategorieModel = require('../models/Categorie');
const categorieController = require('../controllers/CategorieControler');

const validateCategorieId = async (req, res, next) => {
  const categorie = await CategorieModel.findByPk(req.params.categorieId);
  if (!categorie) {
    return res.status(404).json({ error: 'Categorie not found' });
  }
  next();
}

router.get('/categorie', categorieController.index);

router.post('/categorie', categorieController.create);

router.get('/categorie/:categorieId', validateCategorieId, categorieController.show);

router.put('/categorie/:categorieId', validateCategorieId, categorieController.update);

router.delete('/categorie/:categorieId', validateCategorieId, categorieController.delete);

module.exports = router;
