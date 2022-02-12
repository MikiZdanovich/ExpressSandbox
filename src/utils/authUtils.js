const logger = require('../../logger')

function setLoginParams (request) {
  try {
    const payload = { username: request.body.username, password: request.body.password }
    return payload
  } catch (e) {
    logger.error(e)
    throw e
  }
}

module.exports = { setLoginParams }
