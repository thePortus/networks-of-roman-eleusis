const md5 = require('md5');
const jwt = require('jsonwebtoken');

const db = require('../models');
const Op = db.Sequelize.Op;

const User = db.users;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  User.findAll({
      where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving users.'
      });
    });
};

// Log a user in
exports.login = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: 'Must contain an \'username\'!'
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: 'Must contain an \'password\' number!'
    });
    return;
  }
  const requestObj = {
    username: req.body.username,
    // hash the password
    password: md5(req.body.password.toString()),
  };
  User.findOne({
      where: {
        username: requestObj.username,
        password: requestObj.password
      }
  })
   .then(data => {
     if (!data || data.length == 0) {
       res.status(500).send({
         status: 0,
         message:'User not found or password incorrect'
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
         err.message || 'Some error occurred while logging in.'
     });
   });
};

// Register a user
exports.register = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: 'Must contain an \'username\'!'
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: 'Must contain an \'email\' number!'
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: 'Must contain an \'password\' number!'
    });
    return;
  }

  // check for existing users, if none, make first user owner
  User.findAll()
    .then(allUsers => {
      // default to making new user normal user
      var userRole = 'User';
      if (allUsers.length == 0) {
        userRole = 'Owner';
      }
      const requestObj = {
        username: req.body.username,
        email: req.body.email,
        role: userRole,
        // hash the password
        password: md5(req.body.password.toString()),
      };
      User.create(requestObj)
       .then(data => {
         if (!data) {
           res.send({
             status: 0,
             message:
               err.message || 'Some error occurred while registering.'
           });
         }
         else {
           let token = jwt.sign({ data: data }, 'secret');
           res.send({ status: 1, data: data, token: token });
         }
       })
       .catch(err => {
         res.send({
           status: 0,
           message:
             'An error occured, username or email may already be taken.'
         });
       });
    });
};

// Update a user by the username in the request
exports.update = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: 'Must contain an \'username\'!'
    });
    return;
  }
  if (!req.body.authorizingId) {
    res.status(400).send({
      message: 'Must contain an \'authorizingId\'!'
    });
    return;
  }
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner') {
        res.status(500).send({
          message: 'Error updating username=' + req.params.username + ' with authorizingId=' + req.body.authorizingId + ': user is not owner'
        });
        return;
      }
      var requestObj = {};
      requestObj.username = req.params.username;
      if (req.body.email) {
        requestObj.email = req.body.email;
      }
      if (req.body.role) {
        requestObj.role = req.body.role;
      }
      User.update(requestObj, {where: { username: requestObj.username }})
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'User was updated successfully.'
            });
          } else {
            res.send({
              message: `Cannot update User with username=${requestObj.username}. Maybe User was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error updating User with id=' + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating username=' + req.params.username + ' with authorizingId=' + req.body.authorizingId
      });
    });

};
