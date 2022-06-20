module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InscriptionFeatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inscriptionId: {
        type: Sequelize.INTEGER
      },
      feature: {
        type: Sequelize.STRING
      },
      uncertain: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('InscriptionFeatures');
  }
};
