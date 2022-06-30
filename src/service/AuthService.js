const logger = require('../utils/logger')
const Service = require('./Service')
const JwtService = require('./jwtService')
const secrets = require('../../config/secrets')
const tokenUtils = require('../utils/authUtils')
const jwtService = new JwtService(secrets)

async function loginUser (request) {
  const user = await tokenUtils.verifyUser(request)
  const { accessToken, refreshToken } = await jwtService.generate(user)

  return Service.successResponse({
    accessToken: accessToken,
    refreshToken: refreshToken
  }, 200)
}

async function refreshToken (request) {
  try {
    await tokenUtils.verifyToken(request)
    await loginUser(request)
  } catch (e) {
    logger.error(e)
    e.code = 401
    throw e
  }
}

module.exports = { loginUser, refreshToken }
