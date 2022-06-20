const peopleWithHonors = require('./import/people_with_honors.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const personWithHonor of peopleWithHonors) {
        await queryInterface.bulkInsert('PeopleWithHonors', [
          {
              personId: personWithHonor.personId,
              honorId: personWithHonor.honorId,
              inscriptionId: personWithHonor.inscriptionId,
              appearances: personWithHonor.appearances,
              uncertain: personWithHonor.uncertain,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PeopleWithHonors');
  }
};
