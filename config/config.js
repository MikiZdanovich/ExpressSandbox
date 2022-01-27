const env = process.env.ENV || 'dev'

const dev = {
  PORT: process.env.PORT || 3000,

  username: process.env.PGUSERNAME || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'db',
  host: process.env.PGHOST || null,
  dialect: 'postgres',
  port: process.env.PGPORT || 5432

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

const config = { dev, test }

module.exports = config[env]
