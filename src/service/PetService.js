const models = require("../db/models");


class PetService {
  async getPets(request_params) {
    return await models.Pet.findAll({ where: request_params });
  }

  async getPet(petId) {
    return await models.Pet.findByPk(petId);
  }

  async addPet(pet_info) {
    return await models.Pet.create(pet_info);
  }

  async deletePet(petId) {
    await models.Pet.destroy({ where: {id: petId} });
  }

  async updatePet(id, pet_info) {
    return models.Pet.update(pet_info, { where: id });
  }

  async uploadFile(id, payload) {
    for (const item of payload) {
      await models.Image.create(item, { where: id });
    }

  }
}

module.exports = PetService