const logger = require('../utils/logger')
const Service = require('./Service')
const { setUserParams } = require('../utils/userUtils')

const models = require('../db/models')
const secrets = require('../../config/secrets')

const JwtService = require('./jwtService')
const UserDto = require('../userDto')
const jwtService = new JwtService(secrets)

async function createUser (request) {
  const payload = setUserParams(request)
  const candidate = await models.User.findOne({ where: { email: payload.email } })
  if (candidate) {
    return Service.rejectResponse({ message: `User with email ${payload.email} already exists` }, 405)
  }

  const user = await models.User.create(
    payload
  )
  const userDto = new UserDto(user)
  const userTokens = await jwtService.generate(userDto)
  logger.info(user)
  return Service.successResponse(userTokens, 200)
}

module.exports = {
  createUser
}
