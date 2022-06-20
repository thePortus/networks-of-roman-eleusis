const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/honor.controller.js');
  var router = require('express').Router();
  // Create a new Honor
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all Honors
  router.get('/', controller.findAll);
  // Retrieve a single Honor with id
  router.get('/:id', controller.findOne);
  // Update a Honor with id
  router.put('/:id', limitRate, auth.verifyToken, controller.update);
  // Delete a Honor with id
  router.delete('/:id', limitRate, auth.verifyToken, controller.delete);
  // Delete all Honors
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/honors', router);
};
