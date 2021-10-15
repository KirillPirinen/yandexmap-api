const {Like, User} = require('../../../db/models');
const appError = require('../../errors/errors');

module.exports = class likeCotroller {
  static like = async (req, res, next) => {
    try {
      const [like, flag] = await Like.findOrCreate({where:{userid:req.session.user.id, bookid:req.params.id}, defaults: {
        userid:req.session.user.id, 
        bookid:req.params.id
      }});
      if(flag) {
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } catch(err){
      next(new Error());
    }
  }
};
