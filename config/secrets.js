const secrets = {
  accessTokenSecret: process.env.TOKEN_SECRET || 'accessSecret',
  refreshTokenSecret: process.env.REFRESH_SECRET || 'refreshSecret'
}

module.exports = secrets
