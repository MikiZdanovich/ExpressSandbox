const Router = require('express')
const {
  loginUser
} = require('../controllers/AuthController')

const router = Router()

router.post('/', loginUser)

module.exports = router
