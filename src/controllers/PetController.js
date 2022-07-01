const Controller = require('./Controller');
const PetService = require('../service/PetService.js')
const {
  setGetPetsParams,
  setPostPetParams,
  setPetIdFromHeaders,
  setUploadFilePayload,
} = require("../utils/petUtil");

// ToDo create in other place

const petService = new PetService()


// ToDo Add normal error handling

const addPet = async (request, response) => {

  pet = await petService.addPet(request.body)

  Controller.sendResponse(response, Controller.successResponse(pet, status_code=201))
}

const deletePet = async (request, response) => {
  const petId = setPetIdFromHeaders(request)

  await petService.deletePet(petId)

  Controller.sendResponse(response, Controller.successResponse(null, 204))
}

const getPets = async (request, response) => {
  const request_params = setGetPetsParams(request)

  const pets = await petService.getPets(request_params);

  Controller.sendResponse(response, Controller.successResponse(pets))
}

const updatePet = async (request, response) => {
  // ToDo extract id from path
  const id = setPetIdFromHeaders(request)
  const pet_info = setPostPetParams(request)

  const updated_pet = await petService.updatePet(id, pet_info)

  Controller.sendResponse(response, Controller.successResponse(updated_pet, 204))
}

const uploadPetImage = async (request, response) => {
  const { payload, id } = setUploadFilePayload(request)

  await petService.uploadFile(id, payload)

  Controller.sendResponse(response, Controller.successResponse(null, 204))
}

module.exports = {
  addPet,
  deletePet,
  getPets,
  updatePet,
  uploadPetImage
}
