const Router = require('express')

const router = Router()

const {
  createUser
} = require('../controllers/UserController')

router.post('/', createUser)

module.exports = router
