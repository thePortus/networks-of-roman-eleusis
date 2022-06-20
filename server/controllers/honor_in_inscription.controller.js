const db = require('../models');
const Op = db.Sequelize.Op;

const Honor = db.honors;
const Inscription = db.inscriptions;
const HonorInInscription = db.honorsInInscriptions;
const User = db.users;

// Create and Save a new Honor in Inscription
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.inscriptionId) {
    errorMsgs.push('Must contain an \'inscriptionId\' field!');
  }
  if (errorMsgs.length > 0) {
    res.send({
      status: 0,
      messages: errorMsgs
    });
    return;
  }
  const requestObj = {
    inscriptionId: req.body.inscriptionId,
    honorId: req.body.honorId,
  };
  // ensure request sent by approved user
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner' && authorizingUser.role != 'Editor') {
        res.status(500).send({
          message: 'Error adding inscription=' + req.params.id + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      HonorInInscription.create(requestObj)
        .then(data => {
          console.log(`>> added Honor id=${requestObj.honorId} to Inscription id=${requestObj.inscriptionId}`);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Honor in Inscription.'
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding inscription=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all HonorsInInscriptions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  HonorInInscription.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving honors in inscriptions.'
      });
    });
};


// Delete an Honor in Inscription with the specified ids in the request
exports.delete = (req, res) => {
  const requestObj = {
    inscriptionId: req.params.inscriptionId,
    honorId: req.params.honorId,
  };
  HonorInInscription.destroy({
    where: {
      honorId: requestObj.honorId,
      inscriptionId: requestObj.inscriptionId,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Honor In Inscription was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Honor In Inscription with honorId=${requestObj.honorId}, inscriptionId=${requestObj.inscriptionId}. Maybe Honor In Inscription was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Cannot delete Honor In Inscription with honorId=${requestObj.honorId}, inscriptionId=${requestObj.inscriptionId}. Maybe Honor In Inscription was not found!`
      });
    });
};

// Delete all Honors In Inscriptions from the database.
exports.deleteAll = (req, res) => {
  HonorInInscription.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Honors In Inscriptions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all honors from inscriptions.'
      });
    });
};
