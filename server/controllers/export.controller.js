const db = require('../models');
const Op = db.Sequelize.Op;

const Inscription = db.inscriptions;
const InscriptionFeature = db.inscriptionFeatures;
const InscriptionReference = db.inscriptionReferences;
const Honor = db.honors;
const HonorInInscription = db.honorsInInscriptions;
const Institution = db.institutions;
const InstitutionHonor = db.institutionHonors;
const InstitutionInscription = db.institutionInscriptions;
const Person = db.people;
const PersonInInscription = db.peopleInInscriptions;
const PersonWithHonor = db.peopleWithHonors;
const User = db.users;
//res.send(responseData);
// Retrieve all Inscriptions from the database.
exports.findAll = (req, res) => {
  var responseData = {
    inscriptions: [],
    inscriptionFeatures: [],
    inscriptionReferences: [],
    honors: [],
    honorsInInscriptions: [],
    institutions: [],
    institutionHonors: [],
    institutionInscriptions: [],
    people: [],
    personInInscription: [],
    personWithHonor: []
  };
  Inscription.findAll()
    .then(inscriptionData => {
      InscriptionFeature.findAll()
        .then(inscriptionFeatureData => {
          InscriptionReference.findAll()
            .then(inscriptionReferenceData => {
              Honor.findAll()
                .then(honorData => {
                  HonorInInscription.findAll()
                    .then(honorInInscriptionData => {
                      Institution.findAll()
                        .then(institutionData => {
                          InstitutionHonor.findAll()
                            .then(institutionHonorData => {
                              InstitutionInscription.findAll()
                                .then(institutionInscriptionData => {
                                  Person.findAll()
                                    .then(personData => {
                                      PersonInInscription.findAll()
                                        .then(personInInscriptionData => {
                                          PersonWithHonor.findAll()
                                            .then(personWithHonorData => {
                                              responseData = {
                                                inscriptions: inscriptionData,
                                                inscriptionFeatures: inscriptionFeatureData,
                                                inscriptionReferences: inscriptionReferenceData,
                                                honors: honorData,
                                                honorsInInscriptions: honorInInscriptionData,
                                                institutions: institutionData,
                                                institutionHonors: institutionHonorData,
                                                institutionInscriptions: institutionInscriptionData,
                                                people: personData,
                                                peopleInInscriptions: personInInscriptionData,
                                                peopleWithHonors: personWithHonorData
                                              };
                                              res.send(responseData);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
