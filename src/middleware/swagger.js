const swaggerUI = require('swagger-ui-express')
const OpenApiValidator = require('express-openapi-validator')
const jsYaml = require('js-yaml')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerConfig = require('../../config/swagger')
const fs = require('fs')
const logger = require('../../logger')

class SwaggerMiddleware {
  constructor (app) {
    this.app = app
    this.openApiPath = swaggerConfig.OPENAPI_YAML
    this.swaggerOptions = swaggerConfig.SWAGGER_OPTIONS
    try {
      this.schema = jsYaml.load(fs.readFileSync(this.openApiPath))
    } catch (e) {
      logger.error('failed to load openApi schema', e.message)
    }
  }

  init () {
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema, swaggerJsDoc(this.swaggerOptions)))
    this.app.get('/openapi', (req, res) => res.sendFile(this.openApiPath))
    this.app.use(
      OpenApiValidator.middleware(swaggerConfig.VALIDATOR_OPTIONS
      )
    )
  }
}

module.exports = SwaggerMiddleware
