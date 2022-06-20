const inscriptions = require('./import/inscriptions.json');

module.exports = {
  async up (queryInterface, Sequelize) {

    for (const inscription of inscriptions) {
      await queryInterface.bulkInsert('Inscriptions', [
          {
            id: inscription.id,
            ie: inscription.ie,
            title: inscription.title,
            objectType: inscription.objectType,
            inscriptionType: inscription.inscriptionType,
            lowDate: inscription.lowDate,
            highDate: inscription.highDate,
            lowDateUncertain: inscription.lowDateUncertain,
            highDateUncertain: inscription.highDateUncertain,
            text: inscription.text,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
      {});
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inscriptions');
  }
};
