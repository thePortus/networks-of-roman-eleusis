const db = require('../models');
const Op = db.Sequelize.Op;

const InscriptionReference = db.inscriptionReferences;
const Inscription = db.inscriptions;
const User = db.users;

// Create and Save a new Inscription Reference
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.authorizingId) {
    errorMsgs.push('Must contain an \'authorizingId\'!');
  }
  if (!req.body.inscriptionId) {
    errorMsgs.push('Must contain an \'inscriptionId\' field!');
  }
  if (!req.body.publication) {
    errorMsgs.push('Must contain a \'publication\' field!');
  }
  if (!req.body.number) {
    errorMsgs.push('Must contain a \'number\' field!');
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
    inscriptionId: req.body.inscriptionId,
    publication: req.body.publication,
    number: req.body.number,
    additional: req.body.additional || null,
    notes: req.body.notes || '',
  };
  // ensure request sent by approved user
  User.findByPk(req.body.authorizingId)
    .then(authorizingUser => {
      if (authorizingUser.role != 'Owner' && authorizingUser.role != 'Editor') {
        res.status(500).send({
          message: 'Error adding inscription reference on=' + req.params.inscriptionId + ' with authorizingId=' + req.body.authorizingId + ': user is not approved'
        });
        return;
      }
      // Find related existing entries
      return Inscription.findByPk(requestObj.inscriptionId, {
        include: [
          {
            model: InscriptionReference,
            as: 'references',
            attributes: ['id', 'publication', 'number', 'additional'],
          }
        ],
      })
        .then(inscription => {
          if (!inscription) {
            const msg = 'Inscription not found!';
            console.log(msg);
            res.send({message: msg});
            return null;
          }
          InscriptionReference.create(requestObj)
            .then(data => {
              console.log(`>> added Reference id=${requestObj.id} to Inscription id=${inscription.id}`);
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || 'Some error occurred while adding the Inscription Reference.'
              });
            });
        })
        .catch((err) => {
          const msg = '>> Error while adding Reference to Inscription: ';
          console.log(msg, err);
          res.send({message: msg});
          return null;
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error adding inscription reference on=' + req.params.inscriptionId + ' with authorizingId=' + req.body.authorizingId
      });
    });
};

// Retrieve all InscriptionFeatures from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  InscriptionReference.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving inscription references.'
      });
    });
};

// Find a single Inscription Reference with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  InscriptionReference.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Inscription Reference with id=${id}.`
        });
      }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error retrieving Inscription Reference with id=' + id
    });
  });
};

// Delete a Inscription Reference with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  InscriptionReference.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Inscription Reference was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Inscription Reference with id=${id}. Maybe Inscription Reference was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Inscription Reference with id=' + id
      });
    });
};

// Delete all Inscription References from the database.
exports.deleteAll = (req, res) => {
  InscriptionReference.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Inscription References were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all references from inscriptions.'
      });
    });
};
