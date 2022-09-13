const { Op } = require('sequelize');
const axios = require('axios');
const CityModel = require('../models/City');
const StateModel = require('../models/State');


class CityController {

  index = async (req, res, next) => {
    const cities = await CityModel.findAll({
      include:[{
        model: StateModel,
        required: false,
        attributes: ['name', 'province']
      }]
    });
    res.json(cities);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const city = await CityModel.create(data);
      res.json(city);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const city = await CityModel.findByPk(req.params.cityId);
    res.json(city);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.cityId;
      const data = await this._validateData(req.body, id);
      await CityModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CityModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await CityModel.destroy({
      where: {
        id: req.params.cityId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'StateId', 'cep'];
    const city = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      city[attribute] = data[attribute];
    }

    if (await this._checkIfCepExists(city.cep, id)) {
      throw new Error(`The city with this cep "${city.cep}" already registred.`);
    }
    if (await this._validateCep(city.cep, city.name)) {
      throw new Error(`The city with this cep "${city.cep}" does not exists.`);
    }
    return city;
  }

  _validateCep = async (cep, name) => {
    console.log(cep);
    const trueCity = await axios.get(`viacep.com.br/ws/${cep}/json/`);
    if (trueCity) {
      if (trueCity.localidade == name) {
        return false;
      }else {
        return true;
      }
    }else {
      return true;
    }
  }

  _checkIfCepExists = async (cep, id) => {
    const where = {
      name: cep
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CityModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new CityController();
