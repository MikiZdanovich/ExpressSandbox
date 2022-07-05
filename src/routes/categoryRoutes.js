const Router = require('express')

const {
    addCategory,
    getCategory,
    getCategories,
} = require('../controllers/CategoryController')


const router = Router()

router.post('/', addCategory)
router.get('/:categoryId', getCategory)
router.get('/', getCategories)

module.exports = router