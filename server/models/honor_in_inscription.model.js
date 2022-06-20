const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HonorInInscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HonorInInscription.init({
    honorId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    inscriptionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  }, {
    sequelize,// de-pluralized table name as sequelize will add an -s
    modelName: 'HonorsInInscription',
  });

  return HonorInInscription;
};
