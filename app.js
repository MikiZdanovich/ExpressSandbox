const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const db = require('./src/db/models')
const logger = require('./logger')
const petRoutes = require('./src/routes/petRoutes')
const SwaggerMiddleware = require('./src/middleware/swagger')
const ErrorParser = require('./src/middleware/errors')

class ExpressServer {
  constructor (config) {
    this.port = config.PORT
    this.app = express()
    this.swagger = new SwaggerMiddleware(this.app)
    this.errorFormater = new ErrorParser(this.app)
    this.upload = multer(config.MulterOptions)

    this.SetupMiddleware()
  }

  SetupMiddleware () {
    // this.setupAllowedMedia();
    this.app.use(cors())
    this.app.use(bodyParser.json({ limit: '14MB' }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(this.upload.any())

    this.swagger.init()
    this.errorFormater.init()

    this.app.use('/pet', petRoutes)
  }

  async launch () {
    http.createServer(this.app).listen(this.port)

    logger.info(`Listening on port ${this.port}`)
  }

  async assertDatabaseConnectionOk () {
    logger.info('Checking database connection...')
    try {
      await db.sequelize.sync()
      logger.info('Database connection OK!')
    } catch (error) {
      logger.error(`Unable to connect to DB. ${error.message}`)
      process.exit(1)
    }
  }

  async close () {
    if (this.server !== undefined) {
      await this.server.close()
      logger.info(`Server on port ${this.port} shut down`)
    }
  }
}

module.exports = ExpressServer
