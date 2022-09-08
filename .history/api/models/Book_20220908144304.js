const { DataTypes, Model } = require('sequelize');
const db = require('../db/conexao');
const Publisher = require('./Publisher');
const Categorie = require('./Categorie');

class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  tittle: {
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
  }
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});

Publisher.hasMany(Book);
Book.belongsTo(Publisher);

Categorie.hasMany(Book);
Book.belongsTo(Categorie);

Book.sync()
module.exports = Book;
