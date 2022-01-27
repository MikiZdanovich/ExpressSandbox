const Router = require('express')
const { addPet, getPetsByTags } = require('../controllers/pet')

const router = Router()

router.get('/:tags', getPetsByTags)

router.post('/', addPet)

module.exports = router
