const logger = require('./logger')
const Service = require('../service/Service')
const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')
const redisService = require('../service/redisService')
const models = require('../db/models')
const bcrypt = require('bcryptjs')

function setLoginParams (request) {
  try {
    const payload = { username: request.body.username, password: request.body.password }
    return payload
  } catch (e) {
    logger.error(e)
    throw e
  }
}

async function verifyToken (request) {
  if (!request.body.refresh) {
    return Service.rejectResponse({ message: 'Refresh token is not present' }, 400)
  }

  const token = request.body.refresh
  try {
    const decoded = jwt.verify(token, secrets.accessTokenSecret)
    if (!decoded) {
      return Service.rejectResponse({ message: 'Refresh token is invalid' }, 401)
    }
    const value = await redisService.get(token)
    if (value) {
      return Service.rejectResponse({ message: 'Refresh token was already used' }, 401)
    }
  } catch (e) {
    logger.error(e)
    e.code = 401
    throw e
  }
}

async function verifyUser (request) {
  const { username, password } = setLoginParams(request)

  const user = await models.User.findOne({
    where: {
      username: username
    }
  })
  if (!user) {
    return Service.rejectResponse({ message: 'Username is incorrect' },
      404)
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password)

  if (!passwordIsValid) {
    return Service.rejectResponse({ message: 'Password is incorrect' },
      404)
  }
  return user
}

module.exports = { setLoginParams, verifyUser, verifyToken }
