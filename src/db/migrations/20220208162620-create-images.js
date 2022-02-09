module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Image', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      data: {
        type: Sequelize.BLOB('long')
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
    await queryInterface.dropTable('Image')
  }
}
