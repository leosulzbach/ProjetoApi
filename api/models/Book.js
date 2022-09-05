const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puclication_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  page: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categories_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  publishers_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});

module.exports = Book;


