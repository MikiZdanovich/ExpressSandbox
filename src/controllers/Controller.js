const logger = require('../../logger')

const createError = require('http-errors')

class Controller {
  static sendResponse (response, payload) {
    response.status(payload.code || 200)

    const responsePayload = payload.payload

    if (responsePayload instanceof Object || responsePayload instanceof Array) {
      responsePayload.status = payload.code
      response.json(responsePayload)
    } else if (responsePayload) {
      response.send(responsePayload)
    } else {
      response.end()
    }
  }

  static sendError (response, error) {
    const httpError = createError(error.status || 500)

    response.status(error.code || 500).json({
      code: error.code || 500,
      message: httpError.message || 'Bad request',
      errors: error.error || 'Something goes wrong'
    })

    return error
  }

  static async handleRequest (request, response, serviceOperation) {
    try {
      const serviceResponse = await serviceOperation(request)
      logger.info(serviceResponse)
      Controller.sendResponse(response, serviceResponse)
    } catch (error) {
      logger.error(error)
      Controller.sendError(response, error)
    }
  }
}

module.exports = Controller
