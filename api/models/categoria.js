const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../db/conexao');

class Categories extends Model { };

Categories.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  
  },
},
{
  sequelize: db,
  tableName: 'categories',
  modelName: 'categories'
  }

);
Categories.sync()

module.exports = Categories;
