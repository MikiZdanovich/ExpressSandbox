const config = require('./config')
const path = require('path')

const swaggerConfig = {
  OPENAPI_YAML: path.join(__dirname, '..', 'api', 'openapi.yaml'),
  SWAGGER_OPTIONS: {
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
  },
  VALIDATOR_OPTIONS: {
    apiSpec: path.join(__dirname, '..', 'api', 'openapi.yaml'),
    operationHandlers: path.join(__dirname, '..', 'src'),
    // fileUploader: { dest: config.FILE_UPLOAD_PATH },
    validateRequests: true,
    validateResponses: true,
    validateApiSpec: true,
    ignoreUndocumented: true
  }

}

module.exports = swaggerConfig
