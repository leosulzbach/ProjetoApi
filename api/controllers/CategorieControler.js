const { Op } = require('sequelize');

const CategorieModel = require('../models/Categorie');

class CategorieController {

  index = async (req, res, next) => {
    const categorie = await CategorieModel.findAll({
    });
    res.json(categorie);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const categorie = await CategorieModel.create(data);
      res.json(categorie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const categorie = await CategorieModel.findByPk(req.params.categorieId);
    res.json(categorie);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.categorieId;
      const data = await this._validateData(req.body, id);
      await CategorieModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CategorieModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await CategorieModel.destroy({
      where: {
        id: req.params.categorieId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const categorie = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      categorie[attribute] = data[attribute];
    }

    if (await this._checkIfNameExists(categorie.name, id)) {
      throw new Error(`The categorie with name "${categorie.name}" already exists.`);
    }

    return user;
  }

  _checkIfNameExists = async (name, id) => {
    const where = {
      name: name
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CategorieModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new CategorieController();
