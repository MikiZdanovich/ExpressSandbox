const express = require('express')
const path = require('path')
const swaggerUI = require('swagger-ui-express')
const http = require('http')
const OpenApiValidator = require('express-openapi-validator')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jsYaml = require('js-yaml')
const cors = require('cors')
const fs = require('fs')
const swaggerJsDoc = require('swagger-jsdoc')
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

    this.app.get('/openapi', (req, res) => res.sendFile((path.join(__dirname, 'api', 'openapi.yaml'))))
    // View the openapi document in a visual interface. Should be able to test from this page
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema, swaggerJsDoc(this.swaggerOptions)))

    // this.app.get('/login-redirect', (req, res) => {
    //   res.status(200)
    //   res.json(req.query)
    // })
    // this.app.get('/oauth2-redirect.html', (req, res) => {
    //   res.status(200)
    //   res.json(req.query)
    // })

    this.app.use('/pet', petRoutes)

    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname, 'src', 'service'),
        fileUploader: { dest: config.FILE_UPLOAD_PATH },
        validateRequests: true,
        validateResponses: true,
        validateApiSpec: true
      }
      )
    )
    // this.app.use((err, req, res, next) => {
    //   res.status(err.status || 500).json({
    //     message: err.message || err,
    //     errors: err.errors || ''
    //   })
    // })
  }

  async launch () {
    http.createServer(this.app).listen(this.port)

    console.log(`Listening on port ${this.port}`)
  }

  async assertDatabaseConnectionOk () {
    console.log('Checking database connection...')
    try {
      await db.sequelize.sync()
      console.log('Database connection OK!')
    } catch (error) {
      console.log('Unable to connect to the database:')
      console.log(error)
      process.exit(1)
    }
  }

  async close () {
    if (this.server !== undefined) {
      await this.server.close()
      console.log(`Server on port ${this.port} shut down`)
    }
  }
}

module.exports = ExpressServer
