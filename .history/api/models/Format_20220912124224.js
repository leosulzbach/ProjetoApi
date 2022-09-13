const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../db/conexao');

class Format extends Model { };

Format.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  
  }
},
{
  sequelize: db,
  tableName: 'formats',
  modelName: 'Format'
  }

);
Format.sync({alter: true})

module.exports = Format;
