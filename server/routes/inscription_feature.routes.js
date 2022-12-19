const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/inscription_feature.controller.js');
  var router = require('express').Router();
  // Create a new InscriptionFeature
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all InscriptionFeatures
  router.get('/', controller.findAll);
  // Retrieve all InscriptionFeatures
  router.get('/:id', controller.findOne);
  // Delete an InscriptionFeature
  router.delete('/:id', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all InscriptionFeatures
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/inscription_features', router);
};
