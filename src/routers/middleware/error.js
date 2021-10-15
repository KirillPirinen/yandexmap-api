const appError = require('../../errors/errors');
module.exports = function(err, req, res, next) {
  if(err instanceof appError) {
    return res.status(err.status).json(err.message)
  }
  return res.status(500).render('error', {message:`Что-то пошло не по плану...  \r\n${err}`})
};
