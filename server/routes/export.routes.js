module.exports = app => {
  const controller = require('../controllers/export.controller.js');
  var router = require('express').Router();
  // Retrieve all Honors
  router.get('/', controller.findAll);
  app.use('/api/export', router);
};
