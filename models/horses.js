'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class horses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  horses.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    sex: DataTypes.STRING,
    status: DataTypes.STRING,
    notes: DataTypes.STRING,
    lastChecked: DataTypes.STRING,
    registration: DataTypes.INTEGER,
    client: DataTypes.STRING,
    foreignKey: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'horses',
  });
  return horses;
};