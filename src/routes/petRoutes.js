const Router = require('express')

const {
  addPet,
  getPets,
  updatePet,
  deletePet,
  uploadPetImage,
  getPet,
} = require('../controllers/PetController')

const router = Router()

router.get('/', getPets)

router.post('/', addPet)

router.put('/', updatePet)

router.delete('/:petId', deletePet)

router.post('/uploadImage', uploadPetImage)

router.get('/:petId', getPet)

module.exports = router
