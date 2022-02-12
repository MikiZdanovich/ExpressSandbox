const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { setLoginParams } = require('../utils/authUtils')
const models = require('../db/models')
const Service = require('./Service')
const secrets = require('../../config/secrets')

async function loginUser (request) {
  const { username, password } = setLoginParams(request)

  const user = await models.User.findOne({
    where: {
      username: username
    }
  })

  if (!user) {
    return Service.rejectResponse({ message: 'Username is incorrect' },
      404)
  } else {
    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return Service.rejectResponse({ message: 'Password is incorrect' },
        404)
    } else {
      const accessToken = jwt.sign({
        id: user.id,
        name: user.name
      }, secrets.accessTokenSecret, { expiresIn: '1800s' })

      const refreshToken = jwt.sign({
        id: user.id,
        name: user.name
      }, secrets.refreshTokenSecret, { expiresIn: '3600s' })

      return Service.successResponse({
        accessToken: accessToken,
        refreshToken: refreshToken
      }, 200)
    }
  }
}

module.exports = { loginUser }
