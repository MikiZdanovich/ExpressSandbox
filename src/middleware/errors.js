const logger = require('../../logger')

class ErrorFormatter {
  constructor (app) {
    this.app = app
  }

  init () {
    this.app.use((err, req, res, next) => {
      logger.error(err)
      res.status(err.status || err.code || 500).json({
        code: err.status || 500,
        message: err.message || 'Bad request',
        errors: err.errors || err.message || 'Something goes wrong'
      })
    })
  }
}

module.exports = ErrorFormatter
