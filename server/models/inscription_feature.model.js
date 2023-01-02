const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InscriptionFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InscriptionFeature.belongsTo(models.inscriptions, {foreignKey: 'inscriptionId'});
    }
  }
  InscriptionFeature.init({
    inscriptionId: DataTypes.INTEGER,
    feature: DataTypes.STRING,
    uncertain: DataTypes.BOOLEAN,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'InscriptionFeature',
  });
  return InscriptionFeature;
};
