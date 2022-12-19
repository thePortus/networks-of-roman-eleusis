const db = require('../models');
const Op = db.Sequelize.Op;

const InstitutionInscription = db.institutionInscriptions;

// Create and Save a new Institution Inscription
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.institutionId) {
    errorMsgs.push('Must contain an \'institutionId\' field!');
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
    institutionId: req.body.institutionId,
    inscriptionId: req.body.inscriptionId,
    uncertain: req.body.notes || false,
    notes: req.body.notes || ''
  };
  InstitutionInscription.create(requestObj)
    .then(data => {
      console.log(`>> added Inscription id=${requestObj.inscriptionId} to Institution id=${requestObj.institutionId}`);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while adding the Inscription to Institution.'
      });
    });
};

// Retrieve all InstitutionHonors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  InstitutionInscription.findAll({
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving institution inscriptions.'
      });
    });
};

// Delete an InstitutionInscription with the specified id in the request
exports.delete = (req, res) => {
  const requestObj = {
    institutionId: req.params.institutionId,
    inscriptionId: req.params.inscriptionId,
  };
  InstitutionInscription.destroy({
    where: {
      institutionId: requestObj.institutionId,
      inscriptionId: requestObj.inscriptionId,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Institution Inscription was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Institution Inscription with institutionId=${requestObj.institutionId}, inscriptionId=${requestObj.inscriptionId}. Maybe Institution Inscription was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Cannot delete Institution Inscription with institutionId=${requestObj.institutionId}, inscriptionId=${requestObj.inscriptionId}. Maybe Institution Inscription was not found!`
      });
    });
};

// Delete all Institution Inscriptions from the database.
exports.deleteAll = (req, res) => {
  InstitutionInscription.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Institution Inscriptions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all inscriptions from institutions.'
      });
    });
};
