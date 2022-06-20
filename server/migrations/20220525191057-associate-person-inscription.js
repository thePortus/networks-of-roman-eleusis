module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'PeopleInInscriptions',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        personId: {
          type: Sequelize.INTEGER,
          references: { model: 'People', key: 'id' },
          primaryKey: true,
          onDelete: 'NO ACTION'
        },
        inscriptionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Inscriptions', key: 'id' },
          primaryKey: true,
          onDelete: 'NO ACTION'
        },
        role: {
          type: Sequelize.STRING
        },
        notes: {
          type: Sequelize.TEXT
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    // remove table
    return queryInterface.dropTable('PeopleInInscriptions');
  },
};
