const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/inscription.controller.js');
  var router = require('express').Router();
  // Create a new Inscription
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all Inscriptions
  router.get('/', controller.findAll);
  // Retrieve a single Inscription with id
  router.get('/:id', limitRate, controller.findOne);
  // Update a Inscription with id
  router.put('/:id', limitRate, auth.verifyToken, controller.update);
  // Delete a Inscription with id
  router.delete('/:id', limitRate, auth.verifyToken, controller.delete);
  // Delete all Inscriptions
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/inscriptions', router);
};
