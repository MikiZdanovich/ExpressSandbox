const config = require('./config/config')
const logger = require('./logger')
const ExpressServer = require('./app')

const launchServer = async () => {
  try {
    const expressServer = new ExpressServer(config.PORT, config.OPENAPI_YAML)

    await expressServer.assertDatabaseConnectionOk()

    await expressServer.launch()

    logger.info('Express server running')
  } catch (error) {
    logger.error('Express Server failure', error)
    await this.close()
  }
}

launchServer().catch(e => logger.error(e))
