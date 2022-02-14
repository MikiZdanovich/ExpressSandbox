const redisConfig = {
  port: process.env.REDIS_PORT || '6379',
  host: process.env.HOST || 'redis',
  url: process.env.REDIS_URL
}

module.exports = redisConfig
