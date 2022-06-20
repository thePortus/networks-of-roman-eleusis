const institutions = require('./import/institutions.json');

module.exports = {
  async up (queryInterface, Sequelize) {

    for (const institution of institutions) {
      await queryInterface.bulkInsert('Institutions', [
          {
            id: institution.id,
            title: institution.title,
            origin: institution.origin,
            category: institution.category,
            type: institution.type,
            notes: institution.notes,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Institutions');
  }
};
