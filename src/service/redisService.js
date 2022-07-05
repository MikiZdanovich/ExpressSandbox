const { createClient } = require("redis");
const logger = require("../utils/logger");
const redisConfig = require("../../config/redis");

class RedisService {
  constructor() {
    this.configuration = { url: redisConfig.url } || {
      host: redisConfig.host,
      port: redisConfig.port,
    };
    this.client = createClient(this.configuration);
  }

  async start() {
    await this.client.connect();
    await this.client.on("error", (err) => {
      logger.error(err);
    });
    await this.client.on("connect", () => {
      logger.info("Redis cache is ready");
    });
  }

  async exit() {
    await this.client.quit();
    logger.info("redis connection shut down");
  }

  async set({ key, value, timeType, time }) {
    await this.client.set(key, value, timeType, time);
  }

  async get(key) {
    const result = await this.client.get(key);
    return result;
  }
}

module.exports = new RedisService();
