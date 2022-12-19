const jwt = require('jsonwebtoken');

const config = require('../config/db.config');

module.exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'Unauthorized' });
  }
  else {
    jwt.verify(req.headers.authorization, config.JWT_SECRET, function (err, decoded) {
      if(decoded) {
        req.user = decoded.data;
        next();
      }
      else {
        res.status(401).send({ message: 'Unauthorized' });
      }
    });
  }
};

module.exports.verifyAdminToken = (req, res, next) => {
  const adminRoles = ['Owner', 'Editor'];
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'Unauthorized' });
  }
  else {
    jwt.verify(req.headers.authorization, config.JWT_SECRET, function (err, decoded) {
      if(decoded) {
        req.user = decoded.data;
        if(!adminRoles.includes(req.user.role)) {
          res.status(401).send({ message: 'User is not an approved administrator'});
        }
        else {
          next();
        }
      }
      else {
        res.status(401).send({ message: 'Unauthorized' });
      }
    });
  }
};