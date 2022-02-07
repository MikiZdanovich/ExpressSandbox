const Service = require('./Service')
const models = require('../db/models')

async function getPets (request) {
  try {
    const listPets = await models.Pet.findAll({
      where: request
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
    const newPet = await models.Pet.create(request)
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
    await models.Pet.destroy({
      where: request
    })
    return Service.successResponse(null, 204)
  } catch (e) {
    return Service.rejectResponse(e.message || 'Invalid pet Id',
      e.status || 405)
  }
}

/**
 * Update an existing pet
 *
 * body Pet Pet object that needs to be added to the store
 * no response value expected for this operation
 * */
async function updatePet (request) {
  try {
    models.Pet.update(request.body, {
      where: {
        request
      }
    })
    return Service.successResponse(null, 204)
  } catch (e) {
    Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405)
  }
}

/**
 * Updates a pet in the store with form data
 *
 * petId Long ID of pet that needs to be updated
 * name String Updated name of the pet (optional)
 * status String Updated status of the pet (optional)
 * no response value expected for this operation
 * */
const updatePetWithForm = ({ petId, name, status }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        petId,
        name,
        status
      }))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)
/**
 * uploads an image
 *
 * petId Long ID of pet to update
 * additionalMetadata String Additional data to pass to server (optional)
 * file File file to upload (optional)
 * returns ApiResponse
 * */
const uploadFile = ({ petId, additionalMetadata, file }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        petId,
        additionalMetadata,
        file
      }))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = {
  addPet,
  deletePet,
  updatePet,
  updatePetWithForm,
  uploadFile,
  getPets
}
