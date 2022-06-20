'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      username: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      role: Sequelize.STRING,
      password: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  }
};
