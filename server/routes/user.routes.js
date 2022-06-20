const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/user.controller.js');
  var router = require('express').Router();
  // Retrieve all Users
  router.get('/', limitRate, auth.verifyToken, controller.findAll);
  // Login
  router.post('/login', limitRate, controller.login);
  // Register
  router.post('/register', limitRate, controller.register);
  // Update
  router.put('/:username', limitRate, auth.verifyToken, controller.update);
  app.use('/api/user', router);
};
