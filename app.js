const express = require('express')
const path = require('path')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const yaml = require('yamljs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')

const petRoutes = require('./backend/routes/pet')
const config = require('./config/config')
const db = require('./backend/db/models')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// swagger setup
const swaggerDocument = yaml.load('./docs/swagger-config.yaml')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'SDET API',
      description: 'SDET API Sandbox',
      contact: {
        name: 'mik-zdanovich@godeltech.com'
      },
      servers: [`http://localhost:${config.PORT}`]
    }
  },
  apis: ['index.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

// app configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(logger('dev'))

app.use('/sandbox', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerDocs))
app.use('/pet', petRoutes)

// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/', indexRouter)
// app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

async function assertDatabaseConnectionOk () {
  console.log('Checking database connection...')
  try {
    await db.sequelize.sync()
    console.log('Database connection OK!')
  } catch (error) {
    console.log('Unable to connect to the database:')
    console.log(error.message)
    process.exit(1)
  }
}

const server = {
  port: config.PORT,
  async start () {
    await assertDatabaseConnectionOk()

    console.log(`Starting Sequelize + Express app on port ${this.port}...`)

    app.listen(this.port, () => console.log(`Server has been started on port:${this.port}...`))
  }
}

module.exports = server
