const express = require('express')
const path = require('path')
const swaggerUI = require('swagger-ui-express')
const http = require('http')
const OpenApiValidator = require('express-openapi-validator')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('./logger')
const jsYaml = require('js-yaml')
const cors = require('cors')
const petRoutes = require('./backend/routes/petRoutes')
const db = require('./backend/db/models')
const fs = require('fs')
const config = require('./config/config')
const swaggerJsDoc = require('swagger-jsdoc')

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
      this.schema = jsYaml.load(fs.readFileSync(this.openApiPath))
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

    this.app.get('/hello', (req, res) => res.send(`Hello World. path: ${this.openApiPath}`))
    this.app.get('/openapi', (req, res) => res.sendFile((path.join(__dirname, 'api', 'openapi.yaml'))))
    this.app.use('/openapi', swaggerUI.serve, swaggerUI.setup(this.schema))
    // this.app.get('/login-redirect', (req, res) => {
    //   res.status(200)
    //   res.json(req.query)
    // })
    // this.app.get('/oauth2-redirect.html', (req, res) => {
    //   res.status(200)
    //   res.json(req.query)
    // })

    this.app.use('/pet', petRoutes)
  }

  async launch () {
    await this.assertDatabaseConnectionOk()
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname),
        fileUploader: { dest: config.FILE_UPLOAD_PATH },
        validateResponses: true
      })
    )
    this.app.use((err, req, res, next) => {
      // format errors
      res.status(err.status || 500).json({
        message: err.message || err,
        errors: err.errors || ''
      })
    })

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
      console.log(error.message)
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
