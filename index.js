const config = require('./config/config')
const logger = require('./logger')
const ExpressServer = require('./app')

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.PORT, config.OPENAPI_YAML)

    this.expressServer.launch()
    logger.info('Express server running')
  } catch (error) {
    logger.error('Express Server failure', error)
    await this.close()
  }
}

launchServer().catch(e => logger.error(e))
