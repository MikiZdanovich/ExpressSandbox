const Controller = require('./Controller')
const Service = require('../service/AuthService')

const loginUser = async (request, response) => {
  await Controller.handleRequest(request, response, Service.loginUser)
}

const refreshToken = async (request, response) => {
  await Controller.handleRequest(request, response, Service.refreshToken)
}
module.exports = { loginUser, refreshToken }
