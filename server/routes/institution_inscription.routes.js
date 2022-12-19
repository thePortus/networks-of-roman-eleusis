const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/institution_inscription.controller.js');
  var router = require('express').Router();
  // Create a new Institution Inscription
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all Institution Inscriptions
  router.get('/', controller.findAll);
  // Delete an Institution Inscription
  router.delete('/:institutionId/:inscriptionId', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all Institution Inscriptions
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/institution_inscriptions', router);
};
