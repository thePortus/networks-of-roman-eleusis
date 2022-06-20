const institutionInscriptions = require('./import/institution_inscription.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const institutionInscription of institutionInscriptions) {
        await queryInterface.bulkInsert('InstitutionInscriptions', [
          {
              institutionId: institutionInscription.institutionId,
              inscriptionId: institutionInscription.inscriptionId,
              role: institutionInscription.role,
              uncertain: institutionInscription.uncertain,
              notes: institutionInscription.notes,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('InstitutionInscriptions');
  }
};
