const db = require('../models');
const Op = db.Sequelize.Op;

const Person = db.people;
const Inscription = db.inscriptions;
const Honor = db.honors;
const Institution = db.institutions;
const User = db.users;

// Create and Save a new Person
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.title) {
    errorMsgs.push('Must contain an \'title\' field!');
  }
  if (!req.body.origin) {
    errorMsgs.push('Must contain an \'origin\' field!');
  }
  if (!req.body.category) {
    errorMsgs.push('Must contain an \'category\' field!');
  }
  if (!req.body.gender) {
    errorMsgs.push('Must contain an \'gender\' field!');
  }
  if (errorMsgs.length > 0) {
    res.send({
      status: 0,
      messages: errorMsgs
    });
    return;
  }
  const requestObj = {
    id: req.body.id,
    title: req.body.title,
    origin: req.body.origin,
    category: req.body.category,
    gender: req.body.gender,
    athenianCitizen: req.body.athenianCitizen || false,
    romanCitizen: req.body.romanCitizen || false,
    family: req.body.family || null,
    extended: req.body.extended || null,
    praenomen: req.body.praenomen || null,
    nomen: req.body.nomen || null,
    cognomen: req.body.cognomen || null,
    onomos: req.body.onomos || null,
    patronym: req.body.patronym || null,
    deme: req.body.deme || null,
    uncertain: req.body.uncertain || null
  };
  // ensure request sent by approved user
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner' && authorizingUser.role != 'Editor') {
        res.status(500).send({
          message: 'Error adding person=' + req.params.id + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      // Save Person in the database
      Person.create(requestObj)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Person.'
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding person=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Person.findAll({
      where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving people.'
      });
    });
};

// Find a single Person with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Person.findByPk(id, {
    include: [
      {
        model: Inscription,
        as: 'inscriptions',
        attributes: [
          'id', 'ie', 'title', 'objectType', 'inscriptionType', 'location',
          'lowDate', 'highDate', 'date', 'dateSpan', 'lowDateUncertain',
          'highDateUncertain', 'text'
        ],
        include: [
          {
            model: Honor,
            as: 'honors',
            attributes: ['id', 'title', 'category', 'origin', 'type']
          }
        ]
      }, {
        model: Honor,
        as: 'honors',
        attributes: ['id', 'title', 'category', 'origin', 'type'],
        include: [
          {
            model: Institution,
            as: 'institutions',
            attributes: ['id', 'title', 'origin', 'category', 'type']
          },
          {
            model: Inscription,
            as: 'inscriptions',
            attributes: [
              'id', 'ie', 'title', 'objectType', 'inscriptionType', 'location',
              'lowDate', 'highDate', 'date', 'dateSpan', 'lowDateUncertain',
              'highDateUncertain', 'text'
            ]
          }
        ]
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Person with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Person with id=' + id
      });
    });
};

// Update a Person by the id in the request
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
          message: 'Error updating person=' + req.params.id + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      Person.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'Person was updated successfully.'
            });
          } else {
            res.send({
              message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error updating Person with id=' + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating person=' + req.params.id + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Delete a Person with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Person.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Person was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Person with id=' + id
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Person.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all people.'
      });
    });
};
