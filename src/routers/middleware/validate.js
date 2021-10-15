const {User, Book} = require('../../../db/models');
const bcrypt = require('bcrypt');
const errorApp = require('../../errors/errors');
const appError = require('../../errors/errors');

class Validator {
  static isAuth = (req, res, next) => {
    if(req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  }
  static checkPass = async (req, res, next) => { 
    try{
      const user = await User.findOne({where:{email:req.body.email}});
      if(await bcrypt.compare(req.body.password, user?.password)) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('error', {message:`Пароль неверный`});
      }
    } catch(err) {
      next(new Error(`Пользователь с ${req.body.email} не найден`));
    }
  }
  static checkAbility = (req, res, next) => {
   if(req.session.user) next();
   else next(errorApp.unAuth());
}
  static canYouTouchMyBook = async (req, res, next) => {
    try{
      const book = await Book.findOne({include:{model:User}, where:{id:req.params.id}})
      if(book.User.id === req.session.user.id) next();
      else next(appError.badReq());
    } 
    catch(err) {
      next(new Error())
    }
  }

  static registration = async(req, res, next) => {
    try{
      req.body.password = await bcrypt.hash(req.body.password, 1);
      req.session.user = await User.create(req.body);
      res.redirect('/');
    }catch (err) {
      next(err);
    }
  } 
}
module.exports = Validator;
