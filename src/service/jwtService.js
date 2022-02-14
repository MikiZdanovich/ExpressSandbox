const jwt = require('jsonwebtoken')
const Redis = require('../../src/service/redisService')
const secrets = require('../../config/secrets')

class JwtService {
  constructor (config) {
    this.config = config
    this.redisService = Redis
  }

  async generate (id, name) {
    const accessToken = jwt.sign({
      id: this.id,
      name: this.name
    }, this.config.accessTokenSecret, { expiresIn: parseInt(this.config.jwtAccessTime, 10) })

    const refreshToken = await jwt.sign({
      id: this.id,
      name: this.name
    }, this.config.refreshTokenSecret, { expiresIn: parseInt(this.config.jwtRefreshTime, 10) })

    await this.redisService.set(
      {
        key: refreshToken,
        value: '1',
        timeType: 'EX',
        time: secrets.jwtRefreshTime
      }
    )
    return { accessToken, refreshToken }
  }
}

module.exports = JwtService
