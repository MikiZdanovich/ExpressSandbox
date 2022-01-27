const env = process.env.ENV || 'dev'

const db = {
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  dialect: 'postgres',
  port: process.env.PGPORT
}

const dev = {
  PORT: 3000,
  db: db
}

const test = {
  PORT: process.env.PORT,
  db: db
}

const config = { dev, test }

module.exports = config[env]
