const logger = require('../utils/logger')
const Service = require('./Service')
const { setUserParams } = require('../utils/userUtils')

const models = require('../db/models')
const secrets = require('../../config/secrets')

const JwtService = require('./jwtService')
const UserDto = require('../userDto')
const jwtService = new JwtService(secrets)

async function createUser (request) {
  try {
    const payload = setUserParams(request)
    const candidate = await models.User.findOne({ email: payload.email })
    if (candidate) {
      throw new Error(`User with ${payload.email} already exists`)
    }
    const user = await models.User.create(
      payload
    )
    const userDto = new UserDto(user)
    const userTokens = jwtService.generate(...userDto)
    logger.info(user)
    Service.successResponse(userTokens, 200)
  } catch (e) {
    logger.error(e)
    Service.rejectResponse(
      { message: e.message, error: e.errors[0].message },
      e.status || 405
    )
  }
}

module.exports = {
  createUser
}
