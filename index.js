const config = require('./config/config')
const logger = require('./src/utils/logger')
const ExpressServer = require('./app')

const launchServer = async () => {
  try {
    const expressServer = new ExpressServer(config)

    await expressServer.assertDatabaseConnectionOk()

    await expressServer.launch()

    logger.info('Express server running')

    await expressServer.connectRedis()
  } catch (error) {
    logger.error('Express Server failure', error)
    await this.close()
  }
}

launchServer().catch(e => logger.error(e))
