const createError = require('http-errors')
const logger = require('../../logger')

class ErrorFormatter {
  constructor (app) {
    this.app = app
  }

  init () {
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
}

module.exports = ErrorFormatter
