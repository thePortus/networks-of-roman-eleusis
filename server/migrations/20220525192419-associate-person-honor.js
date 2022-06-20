module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'PeopleWithHonors',
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
          onDelete: 'CASCADE'
        },
        honorId: {
          type: Sequelize.INTEGER,
          references: { model: 'Honors', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE'
        },
        inscriptionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Inscriptions', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE'
        },
        appearances: {
          type: Sequelize.INTEGER
        },
        uncertain: {
          type: Sequelize.BOOLEAN
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    // remove table
    return queryInterface.dropTable('PeopleWithHonors');
  },
};
