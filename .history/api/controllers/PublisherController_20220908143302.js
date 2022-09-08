const { Op } = require('sequelize');
const PublisherModel = require('../models/Publisher');
const CityModel = require('../models/City')


class PublisherController {

  index = async (req, res, next) => {
    const publisher = await PublisherModel.findAll({
      include:[{
        model: CityModel,
        required: false,
        attributes: ['name']
      }]
    });
    res.json(publisher);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const publisher = await PublisherModel.create(data);
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const publisher = await PublisherModel.findByPk(req.params.publisherId);
    res.json(publisher);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.publisherId;
      const data = await this._validateData(req.body, id);
      await PublisherModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await PublisherModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await PublisherModel.destroy({
      where: {
        id: req.params.publisherId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'CityId'];
    const publisher = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      publisher[attribute] = data[attribute];
    }

    if (await this._checkIfNamelExists(publisher.name, id)) {
      throw new Error(`The publisher with name "${publisher.name}" already exists.`);
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

    const count = await PublisherModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new PublisherController();
