const Router = require('express')
const {
  loginUser, refreshToken
} = require('../controllers/AuthController')

const router = Router()

router.post('/', loginUser)
router.post('/', refreshToken)
module.exports = router
