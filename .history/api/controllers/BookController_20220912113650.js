const { Op } = require('sequelize');
const BookModel = require('../models/Book');
const CategorieModel = require('../models/Categorie');
const PublisherModel = require('../models/Publisher');

class BookController {

  index = async (req, res, next) => {
    const params = req.query;
    const where = {};
    if (params.title) {
      where.title = {
        [Op.iLike]: `%${params.title}%`
      }
    }
    if (params.categorie) {
      where.categorie = {
        [Op.iLike]: params.categorie
      }
    }

    const book = await BookModel.findAll({
      where: where,
      include:[{
        model: CategorieModel,
        required: false,
        attributes: ['description']
      },
      {
        model: PublisherModel,
        required: false,
        attributes: ['name']
      }]
    });
    res.json(book);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const book = await BookModel.create(data);
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const book = await BookModel.findByPk(req.params.bookId);
    res.json(book);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.bookId;
      const data = await this._validateData(req.body, id);
      await BookModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await BookModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await BookModel.destroy({
      where: {
        id: req.params.bookId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['title', 'author', 'publication_year', 'pages', 'CategorieId', 'PublisherId'];
    const book = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      book[attribute] = data[attribute];
    }

    if (await this._checkIfTitleExists(book.title, id)) {
      throw new Error(`The book with title "${book.title}" already exists.`);
    }

    return book;
  }

  _checkIfTitleExists = async (title, id) => {
    const where = {
      title: title
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await BookModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new BookController();
