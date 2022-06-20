const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/inscription_reference.controller.js');
  var router = require('express').Router();
  // Create a new InscriptionReference
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all InscriptionReferences
  router.get('/', controller.findAll);
  // Retrieve all InscriptionReferences
  router.get('/:id', controller.findOne);
  // Delete an InscriptionReference
  router.delete('/:id', limitRate, auth.verifyToken, controller.delete);
  // Delete all InscriptionReferences
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/inscription_references', router);
};
