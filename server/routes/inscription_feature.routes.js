const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/inscription_feature.controller.js');
  var router = require('express').Router();
  // Create a new InscriptionFeature
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all InscriptionFeatures
  router.get('/', controller.findAll);
  // Retrieve all InscriptionFeatures
  router.get('/:id', controller.findOne);
  // Delete an InscriptionFeature
  router.delete('/:id', limitRate, auth.verifyToken, controller.delete);
  // Delete all InscriptionFeatures
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/inscription_features', router);
};
