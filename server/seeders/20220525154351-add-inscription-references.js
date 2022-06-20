const inscriptionReferences = require('./import/inscription_references.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const inscriptionReference of inscriptionReferences) {
        await queryInterface.bulkInsert('InscriptionReferences', [
          {
              id: inscriptionReference.id,
              inscriptionId: inscriptionReference.inscriptionId,
              publication: inscriptionReference.publication,
              number: inscriptionReference.number,
              additional: inscriptionReference.additional,
              notes: inscriptionReference.notes,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('InscriptionReferences');
  }
};
