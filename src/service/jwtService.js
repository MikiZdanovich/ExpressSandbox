const jwt = require('jsonwebtoken')
const Redis = require('../../src/service/redisService')
const secrets = require('../../config/secrets')

class JwtService {
  constructor(config) {
    this.config = config
    this.redisService = Redis
  }

  async saveToken(payload, refreshToken) {
    await this.redisService.set(
      {
        key: payload.id,
        value: refreshToken,
        timeType: 'EX',
        time: secrets.jwtRefreshTime
      }
    )
  }

  async generate (payload) {

    const accessToken = jwt.sign({
      id: payload.id,
      username: payload.username
    }, this.config.accessTokenSecret, { expiresIn: parseInt(this.config.jwtAccessTime, 10) })

    const refreshToken = await jwt.sign({
      id: payload.id,
      username: payload.username
    }, this.config.refreshTokenSecret, { expiresIn: parseInt(this.config.jwtRefreshTime, 10) })

    await this.saveToken(payload, refreshToken)

    return { accessToken, refreshToken }
  }
}

module.exports = JwtService
