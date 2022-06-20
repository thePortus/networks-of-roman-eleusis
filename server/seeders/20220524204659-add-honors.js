const honors = require('./import/honors.json');

module.exports = {
  async up (queryInterface, Sequelize) {

    for (const honor of honors) {
      await queryInterface.bulkInsert('Honors', [
          {
            id: honor.id,
            title: honor.title,
            origin: honor.origin,
            category: honor.category,
            type: honor.type,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
      {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Honors');
  }
};
