const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./src/db/models')
const logger = require('./src/utils/logger')
const SwaggerMiddleware = require('./src/middleware/swagger')
const ErrorParser = require('./src/middleware/errors')
const authenticateJWT = require('./src/middleware/authentication')
const petRoutes = require('./src/routes/petRoutes')
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes')
const orderRoutes = require('./src/routes/storeRoutes')
const Redis = require('./src/service/redisService')

class ExpressServer {
  constructor(config) {
    this.redisServer = Redis
    this.port = config.PORT
    this.app = express()
    this.swagger = new SwaggerMiddleware(this.app)
    this.errorFormater = new ErrorParser(this.app)

    this.SetupMiddleware()
  }

  SetupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors())
    this.app.use(bodyParser.json({ limit: '14MB' }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.swagger.init()
    this.errorFormater.init()
    this.app.use('/pet', authenticateJWT, petRoutes)
    this.app.use('/login', authRoutes)
    this.app.use('/user', userRoutes)
    this.app.use('/category', authenticateJWT, categoryRoutes)
    this.app.use('/store', authenticateJWT, orderRoutes)
  }

  async launch() {
    http.createServer(this.app).listen(this.port)
    logger.info(`Listening on port ${this.port}`)
  }

  async connectRedis() {
    try {
      logger.info('Checking Redis connection...')
      await this.redisServer.start()
      logger.info('Redis Connected!')
    } catch (error) {
      logger.error(`Unable to connect to Redis. ${error}`)
      process.exit(1)
    }
  }

  async assertDatabaseConnectionOk() {
    logger.info('Checking database connection...')
    try {
      await db.sequelize.sync()
      logger.info('Database connection OK!')
    } catch (error) {
      logger.error(`Unable to connect to DB. ${error}`)
      process.exit(1)
    }
  }

  async close() {
    if (this.app !== undefined) {
      await this.app.close()
      await this.redisServer.exit()
      logger.info(`Server on port ${this.port} shut down`)
    }
  }
}

module.exports = ExpressServer
