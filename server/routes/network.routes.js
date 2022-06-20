const auth = require('../middleware/auth');
const limitRate = require('../middleware/limit-rate');

module.exports = app => {
  const controller = require('../controllers/network.controller.js');
  var router = require('express').Router();
  // Retrieve network of sponsors and their honorands
  router.get('/sponsor_to_honorand', controller.sponsorToHonorand);
  // Retrieve network of sponsors and those appearing on their inscriptions
  router.get('/sponsor_to_appearing', controller.sponsorToAppearing);
  // Retrieve network of sponsors and those appearing on their inscriptions
  router.get('/coappearances', controller.coappearances);
  app.use('/api/networks/', router);
};
