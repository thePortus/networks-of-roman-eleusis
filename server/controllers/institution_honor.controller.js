const db = require('../models');
const Op = db.Sequelize.Op;

const Honor = db.honors;
const Institution = db.institutions;
const InstitutionHonor = db.institutionHonors;
const User = db.users;

// Create and Save a new Institution Honor
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.institutionId) {
    errorMsgs.push('Must contain an \'institutionId\' field!');
  }
  if (!req.body.honorId) {
    errorMsgs.push('Must contain a \'honorId\' field!');
  }
  if (errorMsgs.length > 0) {
    res.send({
      status: 0,
      messages: errorMsgs
    });
    return;
  }
  const requestObj = {
    institutionId: req.body.institutionId,
    honorId: req.body.honorId,
    notes: req.body.notes || ''
  };
  // ensure request sent by approved user
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner' && authorizingUser.role != 'Editor') {
        res.status(500).send({
          message: 'Error adding institution honor institution=' + req.params.institutionId + ' and honor=' + req.params.honorId + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      InstitutionHonor.create(requestObj)
        .then(data => {
          console.log(`>> added Honor id=${requestObj.honorId} to Institution id=${requestObj.institutionId}`);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while adding the Honor to Institution.'
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding institution honor institution=' + req.params.institutionId + ' and honor=' + req.params.honorId + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all InstitutionHonors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  InstitutionHonor.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving institution honors.'
      });
    });
};

// Delete an InstitutionHonor with the specified id in the request
exports.delete = (req, res) => {
  const requestObj = {
    institutionId: req.params.institutionId,
    honorId: req.params.honorId,
  };
  InstitutionHonor.destroy({
    where: {
      institutionId: requestObj.institutionId,
      honorId: requestObj.honorId,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Institution Honor was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Institution Honor with institutionId=${requestObj.institutionId}, honorId=${requestObj.honorId}. Maybe Institution Honor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Cannot delete Institution Honor with institutionId=${requestObj.institutionId}, honorId=${requestObj.honorId}. Maybe Institution Honor was not found!`
      });
    });
};

// Delete all Institution Honors from the database.
exports.deleteAll = (req, res) => {
  InstitutionHonor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Institution Honors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all honors from institutions.'
      });
    });
};
