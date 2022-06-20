const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonWithHonor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonWithHonor.init({
    personId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    honorId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    inscriptionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    appearances: {
      type: DataTypes.INTEGER,
    },
    uncertain: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'PeopleWithHonor',
  });

  return PersonWithHonor;
};
