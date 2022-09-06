const { DataTypes, Model } = require('sequelize');
const db = require('../db/conexao');

class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categories_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'categories',
        key: 'id'
    }
  },
  publishers_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'publishers',
        key: 'id'
    }
  }
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});
Book.sync()
module.exports = Book;
