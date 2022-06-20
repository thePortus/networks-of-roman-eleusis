module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'InstitutionInscriptions',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        institutionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Institutions', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE'
        },
        inscriptionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Inscriptions', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE'
        },
        role: {
          type: Sequelize.STRING
        },
        uncertain: {
          type: Sequelize.BOOLEAN
        },
        notes: {
          type: Sequelize.TEXT
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    // remove table
    return queryInterface.dropTable('InstitutionInscriptions');
  },
};
