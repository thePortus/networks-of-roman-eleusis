const honorsInInscriptions = require('./import/honors_in_inscriptions.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const honorInInscription of honorsInInscriptions) {
        await queryInterface.bulkInsert('HonorsInInscriptions', [
          {
              inscriptionId: honorInInscription.inscriptionId,
              honorId: honorInInscription.honorId,
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HonorsInInscriptions');
  }
};
