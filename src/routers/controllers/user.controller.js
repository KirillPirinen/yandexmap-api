const {User, Book} = require('../../../db/models');
const appError = require('../../errors/errors');

module.exports = class userCotroller {
  static getBooks = async (req, res, next) => {
    try {
      const books = await Book.findAll({where:{user_id:req.params.id}});
      res.json({status:200, books});
    } catch(err){
      next(appError.badReq());
    }
  }
  static getBook = async (req, res, next) => {
    try {
      const book = await Book.findOne({where:{id:req.params.id}});
      res.json(book);
    } catch(err){
      next(appError.badReq());
    }
  }
  static addbook = async (req, res, next) => {
     try {
      req.body.user_id = req.session.user.id;
      const newBook = await Book.create(req.body);
      res.json(newBook);
     } catch(err){
       next(appError.badReq());
     }
  }
  static deleteBook = async (req, res, next) => {
    try {
     await Book.destroy({where:{id:req.params.id}})
     res.sendStatus(204);
    } catch(err){
      next(appError.badReq());
    }
 }

 static updateBook = async (req, res, next) => {
  try {
   await Book.update(req.body, {where:{id:req.params.id}})
   res.json({status:204});
  } catch(err){
    next(appError.badReq());
  }
}
};
