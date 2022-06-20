const inscriptionFeatures = require('./import/inscription_features.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const inscriptionFeature of inscriptionFeatures) {
        await queryInterface.bulkInsert('InscriptionFeatures', [
          {
              id: inscriptionFeature.id,
              inscriptionId: inscriptionFeature.inscriptionId,
              feature: inscriptionFeature.feature,
              uncertain: inscriptionFeature.uncertain,
              notes: inscriptionFeature.notes,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('InscriptionFeatures');
  }
};
