module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'testUser',
      firstname: 'qa',
      lastname: 'test',
      email: 'example@example.com',
      password: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
