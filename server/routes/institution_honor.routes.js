const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/institution_honor.controller.js');
  var router = require('express').Router();
  // Create a new Institution Honor
  router.post('/', limitRate, auth.verifyToken, controller.create);
  // Retrieve all Institution Honors
  router.get('/', controller.findAll);
  // Delete an Institution Honor
  router.delete('/:institutionId/:honorId', limitRate, auth.verifyToken, controller.delete);
  // Delete all Institution Honors
  router.delete('/', limitRate, auth.verifyToken, controller.deleteAll);
  app.use('/api/institution_honors', router);
};
