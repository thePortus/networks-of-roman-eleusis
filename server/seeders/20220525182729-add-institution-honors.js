const institutionHonors = require('./import/institution_honors.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const institutionHonor of institutionHonors) {
        await queryInterface.bulkInsert('InstitutionHonors', [
          {
              institutionId: institutionHonor.institutionId,
              honorId: institutionHonor.honorId,
              notes: institutionHonor.notes,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('InstitutionHonors');
  }
};
