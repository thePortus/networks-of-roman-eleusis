const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    // comment out the line below for running on ubuntu
    socketPath: '/tmp/mysql.sock' //  Specify the socket file path
  },
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// load models
// sequelize-generated core models
db.users = require('./user.model.js')(sequelize, Sequelize);
db.inscriptions = require('./inscription.model.js')(sequelize, Sequelize);
db.honors = require('./honor.model.js')(sequelize, Sequelize);
db.institutions = require('./institution.model.js')(sequelize, Sequelize);
db.people = require('./person.model.js')(sequelize, Sequelize);
db.inscriptionFeatures = require('./inscription_feature.model.js')(sequelize, Sequelize);
db.inscriptionReferences = require('./inscription_reference.model.js')(sequelize, Sequelize);
// manually-generated models of n:m tables already made by sequelize in migration of core models
db.honorsInInscriptions = require('./honor_in_inscription.model.js')(sequelize, Sequelize);
db.institutionHonors = require('./institution_honor.model.js')(sequelize, Sequelize);
db.institutionInscriptions = require('./institution_inscription.model.js')(sequelize, Sequelize);
db.peopleInInscriptions = require('./person_in_inscription.model.js')(sequelize, Sequelize);
db.peopleWithHonors = require('./person_with_honor.model.js')(sequelize, Sequelize);

// set relationships and foreign key constraints
// inscriptions <-> features
db.inscriptionFeatures.belongsTo(db.inscriptions, { foreignKey: 'inscriptionId'});
db.inscriptions.hasMany(db.inscriptionFeatures, { as: 'features' });
// inscriptions <-> references
db.inscriptionReferences.belongsTo(db.inscriptions, { foreignKey: 'inscriptionId'});
db.inscriptions.hasMany(db.inscriptionReferences, { as: 'references' });
// inscriptions <-> honors
db.inscriptions.belongsToMany(db.honors, {
  through: 'HonorsInInscriptions',
  foreignKey: 'inscriptionId',
  as: 'honors'
});
db.honors.belongsToMany(db.inscriptions, {
  through: 'HonorsInInscriptions',
  foreignKey: 'honorId',
  as: 'inscriptions'
});
// institutions <-> honors
db.institutions.belongsToMany(db.honors, {
  through: 'InstitutionHonors',
  foreignKey: 'institutionId',
  as: 'honors'
});
db.honors.belongsToMany(db.institutions, {
  through: 'InstitutionHonors',
  foreignKey: 'honorId',
  as: 'institutions'
});
// institutions <-> inscriptions
db.institutions.belongsToMany(db.inscriptions, {
  through: 'InstitutionInscriptions',
  foreignKey: 'institutionId',
  as: 'inscriptions'
});
db.inscriptions.belongsToMany(db.institutions, {
  through: 'InstitutionInscriptions',
  foreignKey: 'inscriptionId',
  as: 'institutions'
});
// people <-> inscriptions
db.people.belongsToMany(db.inscriptions, {
  through: 'PeopleInInscriptions',
  foreignKey: 'personId',
  as: 'inscriptions'
});
db.inscriptions.belongsToMany(db.people, {
  through: 'PeopleInInscriptions',
  foreignKey: 'inscriptionId',
  as: 'people'
});
// people <-> honors
db.people.belongsToMany(db.honors, {
  through: 'PeopleWithHonors',
  foreignKey: 'personId',
  as: 'honors'
});
db.honors.belongsToMany(db.people, {
  through: 'PeopleWithHonors',
  foreignKey: 'honorId',
  as: 'people'
});

module.exports = db;
