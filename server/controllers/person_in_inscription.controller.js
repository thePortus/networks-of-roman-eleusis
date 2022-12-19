const db = require('../models');
const Op = db.Sequelize.Op;

const PersonInInscription = db.peopleInInscriptions;

// Create and Save a new Person in Inscription
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.personId) {
    errorMsgs.push('Must contain an \'personId\' field!');
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
    inscriptionId: req.body.inscriptionId,
    uncertain: req.body.notes || false,
    notes: req.body.notes || ''
  };
  PersonInInscription.create(requestObj)
    .then(data => {
      console.log(`>> added Inscription id=${requestObj.inscriptionId} to Person id=${requestObj.personId}`);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Person in Inscription.'
      });
    });
};

// Retrieve all People In Inscriptions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  PersonInInscription.findAll({
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving people in inscriptions.'
      });
    });
};

// Delete a Person in Inscription with the specified id in the request
exports.delete = (req, res) => {
  const requestObj = {
    personId: req.params.personId,
    inscriptionId: req.params.inscriptionId,
  };
  PersonInInscription.destroy({
    where: {
      personId: requestObj.personId,
      inscriptionId: requestObj.inscriptionId,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Person In Inscription was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Person in Inscription with personId=${requestObj.personId}, inscriptionId=${requestObj.inscriptionId}. Maybe Person In Inscription was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Cannot delete Person with Honor with personId=${requestObj.personId}, inscriptionId=${requestObj.inscriptionId}. Maybe Person In Inscription was not found!`
      });
    });
};

// Delete all People In Inscriptions from the database.
exports.deleteAll = (req, res) => {
  PersonInInscription.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} People In Inscriptions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all inscriptions from people.'
      });
    });
};
