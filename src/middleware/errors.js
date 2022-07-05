const logger = require('../utils/logger')

class ErrorFormatter {
  constructor (app) {
    this.app = app
  }

  init () {
    this.app.use((err, req, res, next) => {
      logger.error(err)
      res.status(err.status || err.code || 500).json({
        code: err.status || err.code || 500,
        message: err.name || err.error.name || 'Bad request',
        errors: err.errors || err.error.message || 'Something went wrong'
      })
    })
  }
}

module.exports = ErrorFormatter
