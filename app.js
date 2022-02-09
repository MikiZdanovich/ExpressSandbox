const express = require('express')
const path = require('path')
const swaggerUI = require('swagger-ui-express')
const http = require('http')
const createError = require('http-errors')
const OpenApiValidator = require('express-openapi-validator')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jsYaml = require('js-yaml')
const cors = require('cors')
const fs = require('fs')
const swaggerJsDoc = require('swagger-jsdoc')
const multer = require('multer')
const config = require('./config/config')
const db = require('./src/db/models')
const logger = require('./logger')
const petRoutes = require('./src/routes/petRoutes')

class ExpressServer {
  constructor (port, openApiYaml) {
    this.port = port
    this.app = express()
    this.openApiPath = openApiYaml
    this.swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'SDET API',
          description: 'SDET API Sandbox',
          contact: {
            name: 'mik-zdanovich@godeltech.com'
          },
          servers: [`http://localhost:${config.PORT}`]
        }
      },
      apis: ['index.js']
    }
    this.upload = multer({
      dest: config.FILE_UPLOAD_PATH,
      limits: {
        fieldSize: 1024 * 512,
        fieldNameSize: 200
      }
    })
    try {
      this.schema = jsYaml.safeLoad(fs.readFileSync(this.openApiPath))
    } catch (e) {
      logger.error('failed to load openApi schema', e.message)
    }
    this.SetupMiddleware()
  }

  SetupMiddleware () {
    // this.setupAllowedMedia();
    this.app.use(cors())
    this.app.use(bodyParser.json({ limit: '14MB' }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())

    this.app.get('/openapi', (req, res) => res.sendFile(this.openApiPath))

    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema, swaggerJsDoc(this.swaggerOptions)))
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname, 'src'),
        fileUploader: { dest: config.FILE_UPLOAD_PATH },
        validateRequests: true,
        validateResponses: true,
        validateApiSpec: true,
        ignoreUndocumented: true
      }
      )
    )

    // this.app.get('/login-redirect', (req, res) => {
    //   res.status(200)
    //   res.json(req.query)
    // })
    // this.app.get('/oauth2-redirect.html', (req, res) => {
    //   res.status(200)
    //   res.json(req.query)
    // })
    this.app.use(this.upload.any())
    this.app.use('/pet', petRoutes)

    this.app.use((err, req, res, next) => {
      const httpError = createError(err.status || 500)
      logger.error(err)
      res.status(err.status || 500).json({
        code: err.status || 500,
        message: httpError.message || 'Bad request',
        errors: err.errors || 'Something goes wrong'
      })
    })
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
