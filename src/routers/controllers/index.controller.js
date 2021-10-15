const {Book, User, Like} = require('../../../db/models');
const appError = require('../../errors/errors');

module.exports = class indexCotroller {
  static getAllBooks = async (req, res, next) => {
    try {
      const books = await Book.findAll(/*{include:{model:User, through:Like}} здесь начались проблемки*/);
      console.log(books);
      res.locals.books = books;
      next();
    } catch(err){
      next(new Error(err));
    }
  }
};
