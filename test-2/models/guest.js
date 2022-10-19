'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guest.init({
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: {
          msg: 'Please enter your name'
        }
      }
    },
    note: DataTypes.STRING,
    address:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter your address'
        },
        notEmpty: {
          msg: 'Please enter your address'
        }
      }
    },
    phone:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Your phone has been used'
      },
      validate:{
        notNull: {
          msg: 'Please enter your address'
        },
        notEmpty: {
          msg: 'Please enter your address'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'guest',
  });
  return guest;
};