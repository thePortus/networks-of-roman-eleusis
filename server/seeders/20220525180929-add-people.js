const people = require('./import/people.json');

module.exports = {
  async up (queryInterface, Sequelize) {

    for (const person of people) {
      await queryInterface.bulkInsert('People', [
          {
            id: person.id,
            title: person.title,
            origin: person.origin,
            category: person.category,
            gender: person.gender,
            athenianCitizen: person.athenianCitizen,
            romanCitizen: person.romanCitizen,
            family: person.family,
            extended: person.extended,
            praenomen: person.praenomen,
            nomen: person.nomen,
            cognomen: person.cognomen,
            onomos: person.onomos,
            patronym: person.patronym,
            deme: person.deme,
            uncertain: person.uncertain,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People');
  }
};
