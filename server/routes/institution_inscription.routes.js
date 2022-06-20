const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/institution_inscription.controller.js');
  var router = require('express').Router();
  // Create a new Institution Inscription
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all Institution Inscriptions
  router.get('/', controller.findAll);
  // Delete an Institution Inscription
  router.delete('/:institutionId/:inscriptionId', limitRate, auth.verifyToken, controller.delete);
  // Delete all Institution Inscriptions
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/institution_inscriptions', router);
};
