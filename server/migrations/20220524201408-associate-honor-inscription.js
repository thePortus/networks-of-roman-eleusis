module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'HonorsInInscriptions',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        inscriptionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Inscriptions', key: 'id' },
          primaryKey: true,
          onDelete: 'NO ACTION'
        },
        honorId: {
          type: Sequelize.INTEGER,
          references: { model: 'Honors', key: 'id' },
          primaryKey: true,
          onDelete: 'NO ACTION'
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    // remove table
    return queryInterface.dropTable('HonorsInInscriptions');
  },
};
