const md5 = require('md5');
const jwt = require('jsonwebtoken');

const db = require('../models');
const Op = db.Sequelize.Op;

const Inscription = db.inscriptions;
const Institution = db.institutions;
const Person = db.people;

// Sponsors and Honorands
exports.sponsorToHonorand = (req, res) => {
  var responseData = {
    nodes: [],
    edges: []
  };
  // track people and institutions already added to network to avoid duplicates
  var foundPeopleIds = [];
  var foundInstitutionIds = [];
  Inscription.findAll({
    include: [{
      model: Institution,
      as: 'institutions',
      attributes: ['id', 'title', 'origin', 'category', 'type'],
      through: {
        attributes: ['role']
      }
    }, {
      model: Person,
      as: 'people',
      attributes: [
        'id', 'title', 'origin', 'category', 'gender', 'athenianCitizen',
        'romanCitizen', 'family', 'extended', 'praenomen', 'nomen',
        'cognomen', 'onomos', 'patronym', 'deme', 'uncertain'
      ],
      through: {
        attributes: ['role']
      }
    }]
  })
   .then(inscriptions => {
     for (let inscription of inscriptions) {
       var sponsors = [];
       var honorands = [];
       // add institutional sponsors
       for (let institution of inscription.institutions) {
         // only perform if institution has role of sponsor
         if (institution.InstitutionInscriptions.dataValues.role == 'Sponsor') {
             sponsors.push({id: institution.id, label: institution.title, group: 'institutions'});
         }
       }
       // add personal sponsors
       for (let person of inscription.people) {
         // only perform if person has role of sponsor
         if (person.PeopleInInscriptions.dataValues.role == 'Sponsor') {
            sponsors.push({id: person.id, label: person.title, group: 'people'});
         }
       }
       // add personal honorands
       for (let person of inscription.people) {
         // only perform if person has role of honorand
         if (person.PeopleInInscriptions.dataValues.role == 'Honorand') {
           honorands.push({id: person.id, label: person.title, group: 'people'});
         }
       }
       // add all sponsor and honorand nodes to network, avoiding duplicates, only perform if  both sponsors and honorands have been found
       if(sponsors.length > 0 && honorands.length > 0) {
         for (let sponsor of sponsors) {
           if (sponsor.group == 'institutions') {
             if (!foundInstitutionIds.includes(sponsor.id)) {
               foundInstitutionIds.push(sponsor.id);
               // add insitution to network nodes
               responseData.nodes.push(sponsor);
             }
           }
           else if (sponsor.group == 'people') {
             if (!foundPeopleIds.includes(sponsor.id)) {
               foundPeopleIds.push(sponsor.id);
               // add person to network nodes
               responseData.nodes.push(sponsor);
             }
           }
         }
         for (let honorand of honorands) {
           if (!foundPeopleIds.includes(honorand.id)) {
             foundPeopleIds.push(honorand.id);
             // add person to network nodes
             responseData.nodes.push(honorand);
           }
         }
         // create edges between sponsors and honorands
         for (let sponsor of sponsors) {
           for (let honorand of honorands) {
             responseData.edges.push({from: sponsor.id, to: honorand.id, label: 'IE ' + inscription.ie});
           }
         }
       }
     }
     res.send(responseData);
   })
   .catch(err => {
     res.status(500).send({
       status: 0,
       message:
         err.message || 'Some error occurred while getting network.'
     });
   });
};

// Sponsors and Honorands
exports.sponsorToAppearing = (req, res) => {
  var responseData = {
    nodes: [],
    edges: []
  };
  // track people and institutions already added to network to avoid duplicates
  var foundPeopleIds = [];
  var foundInstitutionIds = [];
  Inscription.findAll({
    include: [{
      model: Institution,
      as: 'institutions',
      attributes: ['id', 'title', 'origin', 'category', 'type'],
      through: {
        attributes: ['role']
      }
    }, {
      model: Person,
      as: 'people',
      attributes: [
        'id', 'title', 'origin', 'category', 'gender', 'athenianCitizen',
        'romanCitizen', 'family', 'extended', 'praenomen', 'nomen',
        'cognomen', 'onomos', 'patronym', 'deme', 'uncertain'
      ],
      through: {
        attributes: ['role']
      }
    }]
  })
   .then(inscriptions => {
     for (let inscription of inscriptions) {
       var sponsors = [];
       var appearing = [];
       // add institutional sponsors
       for (let institution of inscription.institutions) {
         // only perform if institution has role of sponsor
         if (institution.InstitutionInscriptions.dataValues.role == 'Sponsor') {
             sponsors.push({id: institution.id, label: institution.title, group: 'institutions'});
         }
       }
       // add personal sponsors
       for (let person of inscription.people) {
         // only perform if person has role of sponsor
         if (person.PeopleInInscriptions.dataValues.role == 'Sponsor') {
            sponsors.push({id: person.id, label: person.title, group: 'people'});
         }
       }
       // add personal appearances
       for (let person of inscription.people) {
         // only perform if person is not sponsor
         if (person.PeopleInInscriptions.dataValues.role != 'Sponsor') {
           appearing.push({id: person.id, label: person.title, group: 'people'});
         }
       }
       // add all sponsor and honorand nodes to network, avoiding duplicates
       if(sponsors.length > 0 && honorands.length > 0) {
         for (let sponsor of sponsors) {
           if (sponsor.group == 'institutions') {
             if (!foundInstitutionIds.includes(sponsor.id)) {
               foundInstitutionIds.push(sponsor.id);
               // add insitution to network nodes
               responseData.nodes.push(sponsor);
             }
           }
           else if (sponsor.group == 'people') {
             if (!foundPeopleIds.includes(sponsor.id)) {
               foundPeopleIds.push(sponsor.id);
               // add person to network nodes
               responseData.nodes.push(sponsor);
             }
           }
         }
         for (let appearingPerson of appearing) {
           if (!foundPeopleIds.includes(appearingPerson.id)) {
             foundPeopleIds.push(appearingPerson.id);
             // add person to network nodes
             responseData.nodes.push(appearingPerson);
           }
         }
         // create edges between sponsors and honorands
         for (let sponsor of sponsors) {
           for (let appearingPerson of appearing) {
             responseData.edges.push({from: sponsor.id, to: appearingPerson.id, label: 'IE ' + inscription.ie});
           }
         }
       }
     }
     res.send(responseData);
   })
   .catch(err => {
     res.status(500).send({
       status: 0,
       message:
         err.message || 'Some error occurred while getting network.'
     });
   });
};

// Sponsors and Honorands
exports.coappearances = (req, res) => {
  var responseData = {
    nodes: [],
    edges: []
  };
  // track people and institutions already added to network to avoid duplicates
  var foundPeopleIds = [];
  var foundInstitutionIds = [];
  Inscription.findAll({
    include: [{
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
      ]
    }]
  })
   .then(inscriptions => {
     for (let inscription of inscriptions) {
       var appearing = [];
       // add institutional sponsors
       for (let institution of inscription.institutions) {
         appearing.push({id: institution.id, label: institution.title, group: 'institutions'});
       }
       for (let person of inscription.people) {
         appearing.push({id: person.id, label: person.title, group: 'people'});
       }
       // add all sponsor and honorand nodes to network, avoiding duplicates
       for (let appearingEntity of appearing) {
         if (appearingEntity.group == 'institutions') {
           if (!foundInstitutionIds.includes(appearingEntity.id)) {
             foundInstitutionIds.push(appearingEntity.id);
             // add insitution to network nodes
             responseData.nodes.push(appearingEntity);
           }
         }
         else if (appearingEntity.group == 'people') {
           if (!foundPeopleIds.includes(appearingEntity.id)) {
             foundPeopleIds.push(appearingEntity.id);
             // add person to network nodes
             responseData.nodes.push(appearingEntity);
           }
         }
       }
       // create edges all appearing entities, avoiding edges leading back to self
       for (let firstAppearingEntity of appearing) {
         for (let secondAppearingEntity of appearing) {
           // avoid when first entity = second
           if (firstAppearingEntity.id != secondAppearingEntity.id) {
             responseData.edges.push({from: firstAppearingEntity.id, to: secondAppearingEntity.id, label: 'IE ' + inscription.ie});
           }
         }
       }
     }
     res.send(responseData);
   })
   .catch(err => {
     res.status(500).send({
       status: 0,
       message:
         err.message || 'Some error occurred while getting network.'
     });
   });
};
