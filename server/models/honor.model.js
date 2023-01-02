const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Honor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Honor.belongsToMany(models.inscriptions, {
        through: 'HonorsInInscriptions',
        foreignKey: 'honorId',
        as: 'inscriptions'
      });
      Honor.belongsToMany(models.institutions, {
        through: 'InstitutionHonors',
        foreignKey: 'honorId',
        as: 'institutions'
      });
      Honor.belongsToMany(models.people, {
        through: 'PeopleWithHonors',
        foreignKey: 'honorId',
        as: 'people'
      });
    }
  }
  Honor.init({
    title: DataTypes.STRING,
    origin: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'Honor',
  });

  return Honor;
};
