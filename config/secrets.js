const secrets = {
  accessTokenSecret: process.env.TOKEN_SECRET || 'accessSecret',
  refreshTokenSecret: process.env.REFRESH_SECRET || 'refreshSecret',
  jwtRefreshTime: process.env.JWT_REFRESH_TIME || '3600',
  jwtAccessTime: process.env.JWT_ACCESS_TIME || '1800'
}

module.exports = secrets
