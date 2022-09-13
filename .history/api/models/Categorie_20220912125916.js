const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../db/conexao');

class Categorie extends Model { };

Categorie.init({
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
  tableName: 'categories',
  modelName: 'Categorie'
  }

);
Categorie.sync({alter: true})

module.exports = Categorie;
