'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Person.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    origin: DataTypes.STRING,
    gender: DataTypes.STRING,
    athenianCitizen: DataTypes.BOOLEAN,
    romanCitizen: DataTypes.BOOLEAN,
    family: DataTypes.STRING,
    extended: DataTypes.STRING,
    praenomen: DataTypes.STRING,
    nomen: DataTypes.STRING,
    cognomen: DataTypes.STRING,
    onomos: DataTypes.STRING,
    patronym: DataTypes.STRING,
    deme: DataTypes.STRING,
    uncertain: DataTypes.BOOLEAN
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'Person',
  });
  return Person;
};
