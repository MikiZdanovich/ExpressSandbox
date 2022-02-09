const Service = require('./Service')
const models = require('../db/models')
const { setGetPetsParams, setPostPetParams, setPetIdFromHeaders, setUploadFilePayload } = require('../utils/petUtil')

async function getPets (request) {
  try {
    const params = setGetPetsParams(request)
    const listPets = await models.Pet.findAll({
      where: params
    })

    return Service.successResponse(listPets)
  } catch (e) {
    return Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405
    )
  }
}

async function addPet (request) {
  try {
    const payload = setPostPetParams(request)
    const newPet = await models.Pet.create(payload)
    return Service.successResponse(`Pet with id:${newPet.id} was created`, 201)
  } catch (e) {
    return Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 400
    )
  }
}

async function deletePet (request) {
  try {
    const petId = setPetIdFromHeaders(request)
    await models.Pet.destroy({
      where: petId
    })
    return Service.successResponse(null, 204)
  } catch (e) {
    return Service.rejectResponse(e.message || 'Invalid pet Id',
      e.status || 405)
  }
}

async function updatePet (request) {
  try {
    const payload = setPostPetParams(request)
    const id = setPetIdFromHeaders(request)
    models.Pet.update(payload, {
      where: id
    })
    return Service.successResponse(null, 204)
  } catch (e) {
    Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405)
  }
}

async function uploadFile (request) {
  const { payload, id } = setUploadFilePayload(request)
  try {
    for (const item of payload) {
      await models.Image.create(item, {
        where: id
      })
    }
    return Service.successResponse(null, 204)
  } catch (e) {
    Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405)
  }
}

module.exports = {
  getPets,
  addPet,
  deletePet,
  updatePet,
  uploadFile

}
