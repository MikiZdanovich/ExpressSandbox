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
    await models.Pet.destroy({ where: { id: petId } });
  }

  async updatePet(petId, petInfo) {
    const pet = await models.Pet.update(petInfo, { where: { id: petId } });

    return await this.getPet(petId);
  }

  async uploadFile(petId, fileName, file) {
    await models.Image.create({ petId: petId, filename: fileName, data: file });
  }
}

module.exports = new  PetService();
