const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InstitutionInscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstitutionInscription.init({
    inscriptionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    institutionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
    },
    uncertain: {
      type: DataTypes.BOOLEAN,
    },
    notes: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'InstitutionInscription',
  });

  return InstitutionInscription;
};
