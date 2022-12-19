const jwt = require('jsonwebtoken');

const db = require('../models');

const User = db.users;

// View user profile
exports.findOne = (req, res) => {
  // Validate request
  if (!req.params.username) {
    res.status(400).send({
      message: 'Must contain an \'username\'!'
    });
    return;
  }
  const requestObj = {
    username: req.params.username
  };
  User.findOne({where: {username: requestObj.username}})
    .then(data => {
      if (!data || data.length == 0) {
        res.status(500).send({
          status: 0,
          message:'User not found incorrect'
        });
      }
      else {
        let token = jwt.sign({ data: data }, 'secret');
        res.send({ status: 1, data: data, token: token });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:
          err.message || 'Some error occurred while viewing profile.'
      });
    });
};
