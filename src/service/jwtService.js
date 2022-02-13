const jwt = require('jsonwebtoken')

class JwtService {
  constructor (config) {
    this.config = config
  }

  generate (id, name) {
    const accessToken = jwt.sign({
      id: this.id,
      name: this.name
    }, this.config.accessTokenSecret, { expiresIn: parseInt(this.config.jwtAccessTime, 10) })

    const refreshToken = jwt.sign({
      id: this.id,
      name: this.name
    }, this.config.refreshTokenSecret, { expiresIn: parseInt(this.config.jwtRefreshTime, 10) })

    return { accessToken, refreshToken }
  }
}

module.exports = JwtService
