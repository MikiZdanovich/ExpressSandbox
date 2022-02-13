const redisConfig = {
  port: process.env.REDIS_PORT || '6379',
  host: process.env.HOST || 'redis-server'
}

module.exports = redisConfig
