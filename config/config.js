const path = require('path')
const env = process.env.ENV || 'dev'

const dev = {
  PORT: process.env.PORT || 3000,

  username: process.env.PGUSERNAME || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'db',
  host: process.env.PGHOST || null,
  dialect: 'postgres',
  pgPort: process.env.PGPORT || 5432,
  ROOT_DIR: __dirname,
  URL_PATH: 'http://localhost',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'src', 'controllers')
}

const test = {
  PORT: process.env.PORT,

  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  dialect: 'postgres',
  port: process.env.PGPORT

}
dev.OPENAPI_YAML = path.join(dev.ROOT_DIR, '..', 'api', 'openapi.yaml')
dev.FILE_UPLOAD_PATH = path.join(dev.ROOT_DIR, '..', 'uploaded_files')

const config = { dev, test }

module.exports = config[env]
