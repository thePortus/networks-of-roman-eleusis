const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/person.controller.js');
  var router = require('express').Router();
  // Create a new Person
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all People
  router.get('/', controller.findAll);
  // Retrieve a single Person with id
  router.get('/:id', controller.findOne);
  // Update a Person with id
  router.put('/:id', limitRate, auth.verifyToken, controller.update);
  // Delete a Person with id
  router.delete('/:id', limitRate, auth.verifyToken, controller.delete);
  // Delete all People
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/people', router);
};
