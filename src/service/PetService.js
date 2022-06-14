const models = require("../db/models");


class PetService {
  async getPets(request_params) {
    return await models.Pet.findAll({ where: request_params });
  }

  async addPet(pet_info) {
    return await models.Pet.create(pet_info);
  }

  async deletePet(petId) {
    await models.Pet.destroy({ where: petId });
  }

  async updatePet(id, pet_info) {
    return models.Pet.update(payload, { where: id });
  }

  async uploadFile(id, payload) {
    for (const item of payload) {
      await models.Image.create(item, { where: id });
    }

  }
}

module.exports = PetService