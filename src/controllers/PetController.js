const Controller = require('./Controller')
const service = require('../service/PetService')

const addPet = async (request, response) => {
  await Controller.handleRequest(request, response, service.addPet)
}

const deletePet = async (request, response) => {
  await Controller.handleRequest(request, response, service.deletePet)
}

const getPets = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPets)
}

const updatePet = async (request, response) => {
  await Controller.handleRequest(request, response, service.updatePet)
}

const uploadPetImage = async (request, response) => {
  await Controller.handleRequest(request, response, service.uploadFile)
}

module.exports = {
  addPet,
  deletePet,
  getPets,
  updatePet,
  uploadPetImage
}
