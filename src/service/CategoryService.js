const models = require("../db/models");

class CategoryService {
  async createCategory(name, description, userId) {
    return models.Category.create({
      name: name,
      description: description,
      userId: userId,
    });
  }

  async getCategory(categoryId) {
    return models.Category.findByPk(categoryId);
  }

  async getCategories(userId) {
    return models.Category.findAll({
      where: {
        userId: userId,
      },
    });
  }
}

module.exports = new CategoryService();
