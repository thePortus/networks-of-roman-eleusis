const peopleInInscriptions = require('./import/people_in_inscriptions.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const personInInscription of peopleInInscriptions) {
        await queryInterface.bulkInsert('PeopleInInscriptions', [
          {
              personId: personInInscription.personId,
              inscriptionId: personInInscription.inscriptionId,
              role: personInInscription.role,
              notes: personInInscription.notes,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PeopleInInscriptions');
  }
};
