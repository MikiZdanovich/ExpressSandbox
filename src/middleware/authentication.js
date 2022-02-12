const jwt = require('jsonwebtoken')
const Controller = require('../controllers/Controller')
const secrets = require('../../config/secrets.js')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    if (!token) {
      return Controller.sendError(res, { code: 401 })
    }
    try {
      const verified = jwt.verify(token, secrets.accessTokenSecret)
      req.user = verified
      next()
    } catch (e) {
      return Controller.sendError(res, { code: 400, error: { name: e.name, message: e.message || 'Unauthorised' } })
    }
  }
}

module.exports = authenticateJWT
