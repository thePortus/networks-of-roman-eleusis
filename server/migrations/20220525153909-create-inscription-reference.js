module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InscriptionReferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inscriptionId: {
        type: Sequelize.INTEGER
      },
      publication: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      additional: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InscriptionReferences');
  }
};
