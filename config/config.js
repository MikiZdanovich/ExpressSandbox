const path = require('path')
const env = process.env.ENV || 'dev'

const dev = {
  PORT: process.env.PORT || 3000,
  URL_PATH: process.env.URL || 'http://localhost',
  username: process.env.PGUSERNAME || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'db',
  host: process.env.PGHOST || null,
  dialect: 'postgres',
  pgPort: process.env.PGPORT || 5432,
  FILE_UPLOAD_PATH: path.join(__dirname, '..', 'uploaded_files'),
  MulterOptions: {
    dest: this.FILE_UPLOAD_PATH,
    fileLimits: {
      fieldSize: 1024 * 1024,
      fieldNameSize: 200
    }
  }
}

const config = { dev }

module.exports = config[env]
