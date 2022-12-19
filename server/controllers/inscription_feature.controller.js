const db = require('../models');
const Op = db.Sequelize.Op;

const InscriptionFeature = db.inscriptionFeatures;
const Inscription = db.inscriptions;

// Create and Save a new Inscription Feature
exports.create = (req, res) => {
  var errorMsgs = [];
  // Validate request
  if (!req.body.inscriptionId) {
    errorMsgs.push('Must contain an \'inscriptionId\' field!');
  }
  if (!req.body.feature) {
    errorMsgs.push('Must contain an \'feature\' field!');
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
    feature: req.body.feature,
  };
  // Find related existing entries
  return Inscription.findByPk(requestObj.inscriptionId, {
    include: [
      {
        model: InscriptionFeature,
        as: 'features',
        attributes: ['id', 'feature', 'uncertain'],
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
      InscriptionFeature.create(requestObj)
        .then(data => {
          console.log(`>> added Feature id=${requestObj.id} to Inscription id=${inscription.id}`);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while adding the Inscription Feature.'
          });
        });
    })
    .catch((err) => {
      const msg = '>> Error while adding Feature to Inscription: ';
      console.log(msg, err);
      res.send({message: msg});
    });
};

// Retrieve all InscriptionFeatures from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  InscriptionFeature.findAll({
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving inscription features.'
      });
    });
};

// Find a single Inscription Feature with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  InscriptionFeature.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Inscription Feature with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Inscription Feature with id=' + id
      });
    });
};

// Delete a Inscription Feature with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  InscriptionFeature.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Inscription Feature was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Inscription Feature with id=${id}. Maybe Inscription Feature was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Inscription Feature with id=' + id
      });
    });
};

// Delete all Inscription Features from the database.
exports.deleteAll = (req, res) => {
  InscriptionFeature.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Inscription Features were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all features from inscriptions.'
      });
    });
};
