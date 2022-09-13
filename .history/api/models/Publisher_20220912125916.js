const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../db/conexao');
const City = require('./City');

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
  }
}, {
  sequelize: db,
  tableName: 'publishers',
  modelName: 'Publisher'
});

City.hasMany(Publisher);
Publisher.belongsTo(City);

Publisher.sync({alter: true})
module.exports = Publisher;