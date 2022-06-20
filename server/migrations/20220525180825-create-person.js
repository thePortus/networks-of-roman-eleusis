module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      athenianCitizen: {
        type: Sequelize.BOOLEAN
      },
      romanCitizen: {
        type: Sequelize.BOOLEAN
      },
      family: {
        type: Sequelize.STRING
      },
      extended: {
        type: Sequelize.STRING
      },
      praenomen: {
        type: Sequelize.STRING
      },
      nomen: {
        type: Sequelize.STRING
      },
      cognomen: {
        type: Sequelize.STRING
      },
      onomos: {
        type: Sequelize.STRING
      },
      patronym: {
        type: Sequelize.STRING
      },
      deme: {
        type: Sequelize.STRING
      },
      uncertain: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('People');
  }
};
