const logger = require('../utils/logger')


class Controller {
  static sendResponse(response, payload) {
    response.status(payload.status_code || payload.code, 200)
    const responsePayload = payload.payload
    if (responsePayload instanceof Object || responsePayload instanceof Array) {
      response.json(responsePayload)
    } else if (responsePayload) {
      response.send(responsePayload)
    } else {
      response.end()
    }
  }

  static sendError(res, err) {
    console.log(err)
    res.status(err.status || err.code || 500).json({
      code: err.status || err.code || 500,
      message: err.name || err.error.message || err.error.name || 'Bad request',
      errors: err.errors || 'Something goes wrong'
    })
  }
  static successResponse(payload, code = 200) {
    return { payload, code }
  }

  static async handleRequest(request, response, serviceOperation) {
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
