/**
 * The StoreController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('../controllers/Controller')
const OrderService = require('../service/StoreService')

const deleteOrder = async (request, response) => {
  orderId = request.params["orderId"]
  OrderService.deleteOrder(orderId)
  Controller.sendResponse(response, Controller.successResponse(204))
}


const getOrderById = async (request, response) => {
  orderId = request.params["orderId"]
  const order = await OrderService.geteOrder(orderId)
  Controller.sendResponse(response, Controller.successResponse(order, 200))
}

const placeOrder = async (request, response) => {

  orderInfo = request.body
  order = await OrderService.createOrder(orderInfo)
  Controller.sendResponse(response, Controller.successResponse(order, 200))
}

module.exports = {
  deleteOrder,
  getOrderById,
  placeOrder
}
