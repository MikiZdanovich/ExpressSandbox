const Router = require('express')
const { addPet, getPetsByTags, getPets, updatePet } = require('../controllers/PetController')

const router = Router()

router.get('/:tags', getPetsByTags)

router.get('/', getPets)

router.post('/', addPet)

router.put('/', updatePet)
module.exports = router
