module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'InstitutionHonors',
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
        honorId: {
          type: Sequelize.INTEGER,
          references: { model: 'Honors', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE'
        },
        notes: {
          type: Sequelize.TEXT
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    // remove table
    return queryInterface.dropTable('InstitutionHonors');
  },
};
