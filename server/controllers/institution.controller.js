const db = require('../models');
const Op = db.Sequelize.Op;

const Institution = db.institutions;
const Honor = db.honors;
const Inscription = db.inscriptions;
const Person = db.people;

// Create and Save a new Institution
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.title) {
    errorMsgs.push('Must contain an \'title\' field!');
  }
  if (!req.body.origin) {
    errorMsgs.push('Must contain an \'origin\' field!');
  }
  if (!req.body.category) {
    errorMsgs.push('Must contain an \'category\' field!');
  }
  if (!req.body.type) {
    errorMsgs.push('Must contain an \'type\' field!');
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
  // Save Institution in the database
  Institution.create(requestObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Institution.'
      });
    });
};

// Retrieve all Institutions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Institution.findAll({
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving institutions.'
      });
    });
};

// Find a single Institution with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Institution.findByPk(id, {
    include: [
      {
        model: Inscription,
        as: 'inscriptions',
        attributes: [
          'id', 'ie', 'title', 'objectType', 'inscriptionType', 'location',
          'lowDate', 'highDate', 'date', 'dateSpan', 'lowDateUncertain',
          'highDateUncertain'
        ],
        include: [{
          model: Honor,
          as: 'honors',
          attributes: ['id', 'title', 'origin', 'category', 'type'],
          include: [
            {
              model: Person,
              as: 'people',
              attributes: [
                'id', 'title', 'origin', 'category', 'gender', 'athenianCitizen',
                'romanCitizen', 'family', 'extended', 'praenomen', 'nomen',
                'cognomen', 'onomos', 'patronym', 'deme', 'uncertain'
              ]
            }
          ]
        }]
      }, {
        model: Honor,
        as: 'honors',
        attributes: ['id', 'title', 'origin', 'category', 'type'],
        include: [
          {
            model: Person,
            as: 'people',
            attributes: [
              'id', 'title', 'origin', 'category', 'gender', 'athenianCitizen',
              'romanCitizen', 'family', 'extended', 'praenomen', 'nomen',
              'cognomen', 'onomos', 'patronym', 'deme', 'uncertain'
            ]
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
          message: `Cannot find Institution with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Institution with id=' + id
      });
    });
};
// Update a Institution by the id in the request
exports.update = (req, res) => {
  var errorMsgs = [];
  // validate request
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
  Institution.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Institution was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Institution with id=${id}. Maybe Institution was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Institution with id=' + id
      });
    });
};

// Delete a Institution with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Institution.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Institution was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Institution with id=${id}. Maybe Institution was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Institution with id=' + id
      });
    });
};

// Delete all Institutions from the database.
exports.deleteAll = (req, res) => {
  Institution.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Institutions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all institutions.'
      });
    });
};
