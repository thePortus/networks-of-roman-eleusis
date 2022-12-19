const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/honor_in_inscription.controller.js');
  var router = require('express').Router();
  // Create a new Honor in Inscription
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all Honors in Inscriptions
  router.get('/', controller.findAll);
  // Delete an Honor in Inscription
  router.delete('/:honorId/:inscriptionId', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all Honors in Inscriptions
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/honors_in_inscriptions', router);
};
