const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inscription.hasMany(models.inscriptionFeatures, { as: 'features' });
      Inscription.hasMany(models.inscriptionReferences, { as: 'references' });
      Inscription.belongsToMany(models.honors, {
        through: 'HonorsInInscriptions',
        foreignKey: 'inscriptionId',
        as: 'honors'
      });
      Inscription.belongsToMany(models.institutions, {
        through: 'InstitutionInscriptions',
        foreignKey: 'inscriptionId',
        as: 'institutions'
      });
      Inscription.belongsToMany(models.people, {
        through: 'PeopleInInscriptions',
        foreignKey: 'inscriptionId',
        as: 'people'
      });
    }
  }
  Inscription.init({
    ie: DataTypes.STRING,
    title: DataTypes.STRING,
    objectType: DataTypes.STRING,
    inscriptionType: DataTypes.STRING,
    location: DataTypes.STRING,
    lowDate: DataTypes.REAL,
    highDate: DataTypes.REAL,
    date: {
      type: DataTypes.VIRTUAL,
      get() {
        const avgDate = (this.lowDate + this.highDate) / 2;
        // round to two decimal places
        return Math.round((avgDate + Number.EPSILON) * 100) / 100;
      },
      set(value) {
        throw new Error('Do not try to set the `date` value!');
      }
    },
    dateSpan: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.highDate - this.lowDate;
      },
      set(value) {
        throw new Error('Do not try to set the `dateSpan` value!');
      }
    },
    lowDateUncertain: DataTypes.BOOLEAN,
    highDateUncertain: DataTypes.BOOLEAN,
    text: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    // de-pluralized table name as sequelize will add an -s
    modelName: 'Inscription',
  });
  return Inscription;
};
