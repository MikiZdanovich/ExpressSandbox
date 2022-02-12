const Controller = require('./Controller')
const service = require('../service/AuthService')

const loginUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.loginUser)
}

module.exports = { loginUser }
