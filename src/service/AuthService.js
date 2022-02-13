const redisService = require('./redisService')
const logger = require('../utils/logger')
const Service = require('./Service')
const JwtService = require('./jwtService')
const secrets = require('../../config/secrets')
const tokenUtils = require('../utils/authUtils')
const jwtService = new JwtService(secrets)

async function loginUser (request) {
  const user = await tokenUtils.verifyUser(request)

  const { accessToken, refreshToken } = jwtService.generate(user.id, user.email)

  return Service.successResponse({
    accessToken: accessToken,
    refreshToken: refreshToken
  }, 200)
}

async function refreshToken (request) {
  try {
    const token = await tokenUtils.verifyToken(request)

    await redisService.set(
      {
        key: token,
        value: '1',
        timeType: 'EX',
        time: secrets.jwtRefreshTime
      }
    )

    const user = tokenUtils.verifyUser(request)
    jwtService.generate(user.id, user.name)
  } catch (e) {
    logger.error(e)
    e.code = 401
    throw e
  }
}

module.exports = { loginUser, refreshToken }
