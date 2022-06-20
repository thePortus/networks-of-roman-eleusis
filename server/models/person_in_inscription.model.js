const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonInInscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonInInscription.init({
    personId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    inscriptionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'PeopleInInscription',
  });

  return PersonInInscription;
};
