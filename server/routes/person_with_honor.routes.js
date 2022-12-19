const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/person_with_honor.controller.js');
  var router = require('express').Router();
  // Create a new Person With Honor
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all People With Honors
  router.get('/', controller.findAll);
  // Delete a Person With Honor
  router.delete('/:personId/:honorId/:inscriptionId', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all People With Honors
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/people_with_honors', router);
};
