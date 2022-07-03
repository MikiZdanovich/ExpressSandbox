const Service = require("./Service");
const models = require("../db/models");

class OrderService {
  async createOrder(ordeInfo) {
    return await models.Order.create(ordeInfo);
  }

  async deleteOrder(orderId){
    models.Order.destroy({ where: { id: orderId } });
}

async geteOrder(orderId){
  return await models.Order.findByPk(orderId);
}
}

module.exports = new OrderService()

