const db = require('../models');
const Op = db.Sequelize.Op;

const Honor = db.honors;
const Inscription = db.inscriptions;
const Institution = db.institutions;
const Person = db.people;
const User = db.users;

// Create and Save a new Honor
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.title) {
    errorMsgs.push('Must contain a \'title\' field!');
  }
  if (!req.body.category) {
    errorMsgs.push('Must contain a \'category\' field!');
  }
  if (!req.body.origin) {
    errorMsgs.push('Must contain an \'origin\'! field');
  }
  if (!req.body.type) {
    errorMsgs.push('Must contain a \'type\'! field');
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
    title: req.body.title,
    origin: req.body.origin,
    category: req.body.category,
    type: req.body.type,
    notes: req.body.notes || '',
  };
  // ensure request sent by approved user
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner' && authorizingUser.role != 'Editor') {
        res.status(500).send({
          message: 'Error adding honor=' + req.params.id + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      // Save Honor in the database
      Honor.create(requestObj)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Honor.'
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding honor=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all Honors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Honor.findAll({
      where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving honors.'
      });
    });
};

// Find a single Honor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Honor.findByPk(id, {
    include: [{
        model: Inscription,
        as: 'inscriptions',
        attributes: [
          'id', 'title', 'objectType', 'inscriptionType', 'location',
          'lowDate', 'highDate', 'date', 'dateSpan', 'lowDateUncertain',
          'highDateUncertain', 'text'
        ]
    }, {
      model: Institution,
      as: 'institutions',
      attributes: ['id', 'title', 'origin', 'category', 'type']
    }, {
      model: Person,
      as: 'people',
      attributes: [
        'id', 'title', 'category', 'origin', 'gender', 'athenianCitizen',
        'romanCitizen', 'family', 'extended', 'praenomen', 'nomen', 'cognomen',
        'onomos', 'patronym', 'deme', 'uncertain'
      ],
      include: [{
        model: Inscription,
        as: 'inscriptions',
        attributes: [
          'id', 'title', 'objectType', 'inscriptionType', 'location',
          'lowDate', 'highDate', 'date', 'dateSpan', 'lowDateUncertain',
          'highDateUncertain', 'text'
        ]
      }]
    }]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Honor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Honor with id=' + id
      });
    });
};
// Update a Honor by the id in the request
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
          message: 'Error updating honor=' + req.params.id + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      Honor.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'Honor was updated successfully.'
            });
          } else {
            res.send({
              message: `Cannot update Honor with id=${id}. Maybe Honor was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error updating Honor with id=' + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating honor=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Delete a Honor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Honor.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Honor was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Honor with id=${id}. Maybe Honor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Honor with id=' + id
      });
    });
};

// Delete all Honors from the database.
exports.deleteAll = (req, res) => {
  Honor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Honors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all honors.'
      });
    });
};
