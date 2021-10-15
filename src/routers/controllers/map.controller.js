const appError = require('../../errors/errors');
const {Location} = require('../../../db/models');

module.exports = class mapCotroller {
  static addlocation = async (req, res, next) => {
    try{
      req.body.user_id = req.session.user.id;
      const location = await Location.create(req.body);
      res.json(location);
    }
    catch(err){
      next(new appError(500, err));
    }
  }
  static getPoints = async (req, res, next) => {
    try{
      const locations = await Location.findAll({where:{user_id:req.session.user.id}});
      res.json(locations);
    }
    catch(err){
      next(new appError(500, err));
    }
  }
  static deletePoint = async (req, res, next) => {
    try {
     await Location.destroy({where:{id:req.params.id}})
     res.sendStatus(204);
    } catch(err){
      next(appError.badReq());
    }
}};
