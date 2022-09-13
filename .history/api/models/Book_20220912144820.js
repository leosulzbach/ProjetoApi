const { DataTypes, Model } = require('sequelize');
const db = require('../db/conexao');
const Publisher = require('./Publisher');
const Categorie = require('./Categorie');
const Format = require('./Format');

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
  value: {
    type: DataTypes.FLOAT
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

Format.hasMany(Book);
Book.belongsTo(Format);

Book.sync({alter: true})
module.exports = Book;
