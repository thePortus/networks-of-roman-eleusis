const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Unauthorized" });
  }
  else {
    jwt.verify(req.headers.authorization, "secret", function (err, decoded) {
      if(decoded) {
        req.user = decoded.data;
        next();
      }
      else {
        res.status(401).send({ message: "Unauthorized" });
      }
    });
  }
};
