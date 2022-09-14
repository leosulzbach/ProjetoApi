const { DataTypes, Model} = require('sequelize');
const db = require('../db/conexao');

class State extends Model { };

State.init({
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
  province: {
    type: DataTypes.STRING,
    allowNull: false
  }
 
}, {
  sequelize: db,
  tableName: 'states',
  modelName: 'State'
});

State.sync({alter: true})
module.exports = State;