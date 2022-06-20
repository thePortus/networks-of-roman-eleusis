module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ie: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      objectType: {
        type: Sequelize.STRING
      },
      inscriptionType: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      lowDate: {
        type: Sequelize.REAL
      },
      highDate: {
        type: Sequelize.REAL
      },
      date: {
        type: Sequelize.REAL
      },
      dateSpan: {
        type: Sequelize.REAL
      },
      lowDateUncertain: {
        type: Sequelize.BOOLEAN
      },
      highDateUncertain: {
        type: Sequelize.BOOLEAN
      },
      text: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Inscriptions');
  }
};
