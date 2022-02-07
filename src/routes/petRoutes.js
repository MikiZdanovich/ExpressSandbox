const Router = require('express')
const {
  addPet,
  getPets,
  updatePet,
  deletePet

} = require('../controllers/PetController')

const router = Router()

router.get('/', getPets)

router.post('/', addPet)

router.put('/', updatePet)

router.delete('/:petId', deletePet)
module.exports = router
