const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/institution.controller.js');
  var router = require('express').Router();
  // Create a new Institution
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all Institutions
  router.get('/', controller.findAll);
  // Retrieve a single Institution with id
  router.get('/:id', controller.findOne);
  // Update a Institution with id
  router.put('/:id', limitRate, auth.verifyAdminToken, controller.update);
  // Delete a Institution with id
  router.delete('/:id', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all Institutions
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/institutions', router);
};
