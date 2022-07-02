const Controller = require('./Controller');
const PetService = require('../service/PetService.js')
const {
  setGetPetsParams,
  setPostPetParams,
  setPetIdFromHeaders,
  setUploadFilePayload,
} = require("../utils/petUtil");
const { response } = require('../routes/petRoutes');

// ToDo create in other place

const petService = new PetService()


// ToDo Add normal error handling

const addPet = async (request, response) => {

  pet = await petService.addPet(request.body)

  Controller.sendResponse(response, Controller.successResponse(pet, status_code = 201))
}

const deletePet = async (request, response) => {
  const petId = request.params["petId"]

  await petService.deletePet(petId)

  Controller.sendResponse(response, Controller.successResponse(204))
}

const getPets = async (request, response) => {
  const request_params = setGetPetsParams(request)

  const pets = await petService.getPets(request_params);

  Controller.sendResponse(response, Controller.successResponse(pets))
}

const updatePet = async (request, response) => {
  const petId = request.params.petId
  const petInfo = request.body;

  const pet = await petService.updatePet(petId, petInfo);

  Controller.sendResponse(response, Controller.successResponse(pet, 200))
}
const multer  = require('formidable');

const uploadPetImage = async (request, response) => {
  const petId = request.params["petId"]

  fileName = request.files[0].originalname
  file =  request.files[0].buffer
  await petService.uploadFile(petId, fileName,  file)
  
  Controller.sendResponse(response, Controller.successResponse(200))
}


const getPet = async (request, response) => {
  const petId = request.params["petId"]
  const pet = await petService.getPet(petId)
  Controller.sendResponse(response, Controller.successResponse(pet, 200))
}

module.exports = {
  addPet,
  deletePet,
  getPets,
  updatePet,
  uploadPetImage,
  getPet
}
