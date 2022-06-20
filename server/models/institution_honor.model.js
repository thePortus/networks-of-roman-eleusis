const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InstitutionHonor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstitutionHonor.init({
    honorId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    institutionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'InstitutionHonor',
  });

  return InstitutionHonor;
};
