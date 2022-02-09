const { transports, createLogger, format } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error', timestamp: true }),
    new transports.File({ filename: 'info.log', level: 'info', timestamp: true }),
    new transports.Console()
  ]
})

module.exports = logger
