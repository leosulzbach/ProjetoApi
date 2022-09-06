const { STRING } = require('sequelize');
const { DataTypes, Model} = require('sequelize');
const db = require('../db/conexao');

class Cities extends Model { };

Cities.init({
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
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'states',
        key: 'id'
    }
  }
}, {
  sequelize: db,
  tableName: 'cities',
  modelName: 'Citie'
});

Cities.sync()
module.exports = Cities;