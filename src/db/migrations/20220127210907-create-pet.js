'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.JSONB
      },
      name: {
        type: Sequelize.STRING
      },
      photoUrls: {
        type: Sequelize.JSONB
      },
      tags: {
        type: Sequelize.JSONB
      },
      status: {
        type: Sequelize.ENUM,
        values: ['available', 'pending', 'sold']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Pets')
  }
}
