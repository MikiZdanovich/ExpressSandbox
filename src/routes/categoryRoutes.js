const Router = require('express')

const {
    addCategory,
    getCategory,
} = require('../controllers/CategoryController')


const router = Router()

router.post('/', addCategory)
router.get('/:categoryId', getCategory)

module.exports = router