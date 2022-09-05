const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Publisher extends Model { };

Publisher.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cities_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'publishers',
  modelName: 'Publisher'
});

module.exports = Publisher;

