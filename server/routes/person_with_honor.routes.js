const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/person_with_honor.controller.js');
  var router = require('express').Router();
  // Create a new Person With Honor
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all People With Honors
  router.get('/', controller.findAll);
  // Delete a Person With Honor
  router.delete('/:personId/:honorId/:inscriptionId', limitRate, auth.verifyToken, controller.delete);
  // Delete all People With Honors
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/people_with_honors', router);
};
