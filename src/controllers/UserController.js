const Controller = require('../controllers/Controller')
const service = require('../service/UserService')

const createUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.createUser)
}

module.exports = {
  createUser
}
