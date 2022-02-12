const logger = require('../../logger')
const Service = require('./Service')
const { setUserParams } = require('../utils/userUtils')

const models = require('../db/models')

async function createUser (request) {
  try {
    const payload = setUserParams(request)
    const user = await models.User.create(
      payload
    )
    logger.info(user)
    return Service.successResponse(null, 200)
  } catch (e) {
    return Service.rejectResponse(
      { message: e.message, errors: e.errors } || 'Invalid input',
      e.status || 405
    )
  }
}

module.exports = {
  createUser
}
