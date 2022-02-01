const Controller = require('./Controller')
const service = require('../service/PetService')

const addPet = async (request, response) => {
  await Controller.handleRequest(request, response, service.addPet)
}

const deletePet = async (request, response) => {
  await Controller.handleRequest(request, response, service.deletePet)
}

const findPetsByTags = async (request, response) => {
  await Controller.handleRequest(request, response, service.findPetsByTags)
}

const findPetsByStatus = async (request, response) => {
  await Controller.handleRequest(request, response, service.findPetsByStatus)
}
const getPetById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPetById)
}

const getPets = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPets)
}

const updatePet = async (request, response) => {
  await Controller.handleRequest(request, response, service.updatePet)
}

const updatePetWithForm = async (request, response) => {
  await Controller.handleRequest(request, response, service.updatePetWithForm)
}

const uploadFile = async (request, response) => {
  await Controller.handleRequest(request, response, service.uploadFile)
}

module.exports = {
  addPet,
  deletePet,
  findPetsByTags,
  getPetById,
  getPets,
  updatePet,
  updatePetWithForm,
  uploadFile,
  findPetsByStatus
}
