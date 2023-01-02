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

// call association functions on all models and set fk constraints
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
