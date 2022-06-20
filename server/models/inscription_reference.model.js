const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InscriptionReference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InscriptionReference.init({
    inscriptionId: DataTypes.INTEGER,
    publication: DataTypes.STRING,
    number: DataTypes.STRING,
    additional: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'InscriptionReference',
  });
  return InscriptionReference;
};
