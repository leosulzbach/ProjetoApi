const { Op } = require('sequelize');
const StateModel = require('../models/State');

class StateController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.email) {
      where.email = {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.min_age) {
      where.age = {
        [Op.gte]: params.min_age
      };
    }

    if (params.max_age) {
      if (! where.age) {
        where.age = {};
      }
      where.age[Op.lte] = params.max_age;
    }

    if (params.sex) {
      where.sex = params.sex;
    }

    const states = await StateModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ]
    });
    res.json(states);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const state = await StateModel.create(data);
      res.json(state);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const state = await StateModel.findByPk(req.params.stateId);
    res.json(state);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.stateId;
      const data = await this._validateData(req.body, id);
      await StateModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await StateModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await StateModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'province'];
    const state = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      state[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(state.email, id)) {
      throw new Error(`The user with mail address "${state.email}" already exists.`);
    }

    return state;
  }

  _checkIfEmailExists = async (email, id) => {
    const where = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new StateController();
