'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book, Like, Location}) {
      this.hasMany(Book, {foreignKey:'user_id'})
      //this.belongsToMany(Book, {through:Like, foreignKey:'userid'})
      this.hasMany(Location, {foreignKey:'user_id'})
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: true,  
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail: true, 
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    group: DataTypes.STRING,
    graduation_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
