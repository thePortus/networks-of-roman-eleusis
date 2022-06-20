const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/person_in_inscription.controller.js');
  var router = require('express').Router();
  // Create a new Person In Inscription
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all People In Inscriptions
  router.get('/', controller.findAll);
  // Delete a Person In Inscription
  router.delete('/:personId/:inscriptionId', limitRate, auth.verifyToken, controller.delete);
  // Delete all People In Inscriptions
  router.delete('/', controller.deleteAll);
  app.use('/api/people_in_inscriptions', limitRate, auth.verifyToken, router);
};
