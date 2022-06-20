const db = require('../models');
const Op = db.Sequelize.Op;

const Inscription = db.inscriptions;
const InscriptionFeature = db.inscriptionFeatures;
const InscriptionReference = db.inscriptionReferences;
const Honor = db.honors;
const Institution = db.institutions;
const Person = db.people;
const User = db.users;

// Create and Save a new Inscription
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.ie) {
    errorMsgs.push('Must contain an \'ie\' field!');
  }
  if (!req.body.title) {
    errorMsgs.push('Must contain a \'title\' field!');
  }
  if (!req.body.objectType) {
    errorMsgs.push('Must contain an \'objectType\' field!');
  }
  if (!req.body.inscriptionType) {
    errorMsgs.push('Must contain an \'inscriptionType\' field!');
  }
  if (!req.body.lowDate) {
    errorMsgs.push('Must contain a \'lowDate\' field!');
  }
  if (!req.body.highDate) {
    errorMsgs.push('Must contain a \'highDate\' field!');
  }
  if (req.body.lowDate > req.body.lowDate) {
    errorMsgs.push('\'lowDate\' cannot be higher than \'highDate\'!');
  }
  if (!req.body.text) {
    errorMsgs.push('Must contain a \'text\' field!');
  }
  if (errorMsgs.length > 0) {
    res.send({
      status: 0,
      messages: errorMsgs
    });
    return;
  }
  const requestObj = {
    id: req.body.id || null,
    ie: req.body.ie,
    title: req.body.title,
    objectType: req.body.objectType,
    inscriptionType: req.body.inscriptionType,
    location: req.body.location || '',
    lowDate: req.body.lowDate,
    highDate: req.body.highDate,
    lowDateUncertain: req.body.lowDateUncertain || false,
    highDateUncertain: req.body.highDateUncertain || false,
    text: req.body.text || '',
    notes: req.body.notes || '',
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
      // Save Inscription in the database
      Inscription.create(requestObj)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Inscription.'
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding inscription=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all Inscriptions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Inscription.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving inscriptions.'
      });
    });
};

// Find a single Inscription with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Inscription.findByPk(id, {
    include: [
      {
        model: InscriptionFeature,
        as: 'features',
        attributes: ['id', 'feature', 'uncertain']
      }, {
        model: InscriptionReference,
        as: 'references',
        attributes: ['id', 'inscriptionId', 'publication', 'number', 'additional']
      }, {
        model: Honor,
        as: 'honors',
        attributes: ['id', 'title', 'origin', 'category', 'type']
      }, {
        model: Institution,
        as: 'institutions',
        attributes: ['id', 'title', 'origin', 'category', 'type']
      }, {
        model: Person,
        as: 'people',
        attributes: [
          'id', 'title', 'origin', 'category', 'gender', 'athenianCitizen',
          'romanCitizen', 'family', 'extended', 'praenomen', 'nomen',
          'cognomen', 'onomos', 'patronym', 'deme', 'uncertain'
        ],
        include: [
          {
            model: Honor,
            as: 'honors',
            attributes: ['id', 'title', 'origin', 'category', 'type']
          }
        ]
      }
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Inscription with id=${id}.`
        });
      }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error retrieving Inscription with id=' + id
    });
  });
};
// Update a Inscription by the id in the request
exports.update = (req, res) => {
  var errorMsgs = [];
  // validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.id) {
    errorMsgs.push('Must contain an \'id\' field!');
  }
  if (errorMsgs.length > 0) {
    res.send({
      status: 0,
      messages: errorMsgs
    });
    return;
  }
  const id = req.params.id;
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner' && authorizingUser.role != 'Editor') {
        res.status(500).send({
          message: 'Error updating inscription=' + req.params.id + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      Inscription.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'Inscription was updated successfully.'
            });
          } else {
            res.send({
              message: `Cannot update Inscription with id=${id}. Maybe Inscription was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error updating Inscription with id=' + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating inscription=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Delete a Inscription with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Inscription.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Inscription was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Inscription with id=${id}. Maybe Inscription was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Inscription with id=' + id
      });
    });
};

// Delete all Inscriptions from the database.
exports.deleteAll = (req, res) => {
  Inscription.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Inscriptions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all inscriptions.'
      });
    });
};
