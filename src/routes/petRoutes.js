const Router = require('express')

const {
  addPet,
  getPets,
  updatePet,
  deletePet,
  uploadPetImage
} = require('../controllers/PetController')

const router = Router()

router.get('/', getPets)

router.post('/', addPet)

router.put('/', updatePet)

router.delete('/', deletePet)

router.post('/uploadImage', uploadPetImage)

module.exports = router
