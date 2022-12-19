const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/institution_honor.controller.js');
  var router = require('express').Router();
  // Create a new Institution Honor
  router.post('/', limitRate, auth.verifyAdminToken, controller.create);
  // Retrieve all Institution Honors
  router.get('/', controller.findAll);
  // Delete an Institution Honor
  router.delete('/:institutionId/:honorId', limitRate, auth.verifyAdminToken, controller.delete);
  // Delete all Institution Honors
  router.delete('/', limitRate, auth.verifyAdminToken, controller.deleteAll);
  app.use('/api/institution_honors', router);
};
