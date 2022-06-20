const db = require('../models');
const Op = db.Sequelize.Op;

const Inscription = db.inscriptions;
const Person = db.people;
const Honor = db.honor;
const PersonWithHonor = db.peopleWithHonors;
const User = db.users;

// Create and Save a new Person with Honor
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.personId) {
    errorMsgs.push('Must contain an \'personId\' field!');
  }
  if (!req.body.honorId) {
    errorMsgs.push('Must contain a \'honorId\' field!');
  }
  if (!req.body.inscriptionId) {
    errorMsgs.push('Must contain a \'inscriptionId\' field!');
  }
  if (errorMsgs.length > 0) {
    res.send({
      status: 0,
      messages: errorMsgs
    });
    return;
  }
  const requestObj = {
    personId: req.body.personId,
    honorId: req.body.honorId,
    inscriptionId: req.body.inscriptionId,
    appearances: req.body.appearances || 1,
    uncertain: req.body.notes || false
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
      PersonWithHonor.create(requestObj)
        .then(data => {
          console.log(`>> added Honor id=${requestObj.honorId} to Person id=${requestObj.personId} in Inscription id=${requestObj.inscriptionId}`);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Person with Honor.'
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding institution honor institution=' + req.params.institutionId + ' and honor=' + req.params.honorId + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all People with Honors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  PersonWithHonor.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving people with honors.'
      });
    });
};

// Delete a Person with Honor with the specified id in the request
exports.delete = (req, res) => {
  const requestObj = {
    personId: req.params.personId,
    honorId: req.params.honorId,
    inscriptionId: req.params.inscriptionId,
  };
  PersonWithHonor.destroy({
    where: {
      personId: requestObj.personId,
      honorId: requestObj.honorId,
      inscriptionId: requestObj.inscriptionId,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Person With Honor was deleted successfully!'
        });
      } else {
        console.log(requestObj);
        res.send({
          message: `Cannot delete Person with Honor with personId=${requestObj.personId}, honorId=${requestObj.honorId}, inscriptionId=${requestObj.inscriptionId}. Maybe Person With Honor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Cannot delete Person with Honor with personId=${requestObj.personId}, honorId=${requestObj.honorId}, inscriptionId=${requestObj.inscriptionId}. Maybe Person With Honor was not found!`
      });
    });
};

// Delete all People With Honors from the database.
exports.deleteAll = (req, res) => {
  PersonWithHonor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} People With Honors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all honors from people.'
      });
    });
};
