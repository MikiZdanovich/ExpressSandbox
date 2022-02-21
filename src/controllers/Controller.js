const logger = require('../utils/logger')

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

  static sendError (res, err) {
    res.status(err.status || err.code || 500).json({
      code: err.status || err.code || 500,
      message: err.name || err.error.message || err.error.name || 'Bad request',
      errors: err.errors || 'Something goes wrong'
    })
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
