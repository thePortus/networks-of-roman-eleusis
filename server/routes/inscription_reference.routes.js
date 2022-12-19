const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/inscription_reference.controller.js');
  var router = require('express').Router();
  // Create a new InscriptionReference
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all InscriptionReferences
  router.get('/', controller.findAll);
  // Retrieve all InscriptionReferences
  router.get('/:id', controller.findOne);
  // Delete an InscriptionReference
  router.delete('/:id', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all InscriptionReferences
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/inscription_references', router);
};
