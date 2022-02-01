const Router = require('express')
const { addPet, findPetsByTags, getPets, updatePet } = require('../controllers/PetController')

const router = Router()

router.get('/:tags', findPetsByTags)

router.get('/', getPets)

router.post('/', addPet)

router.put('/', updatePet)
module.exports = router
