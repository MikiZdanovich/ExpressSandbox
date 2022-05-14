const Service = require('./Service')

/**
 * Delete purchase order by ID
 * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 *
 * orderId Long ID of the order that needs to be deleted
 * no response value expected for this operation
 * */
const deleteOrder = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId
      }))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)
/**
 * Returns pet inventories by status
 * Returns a map of status codes to quantities
 *
 * returns Map
 * */
const getInventory = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({}))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)
/**
 * Find purchase order by ID
 * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 *
 * orderId Long ID of pet that needs to be fetched
 * returns Order
 * */
const getOrderById = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId
      }))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)
/**
 * Place an order for a pet
 *
 * body Order order placed for purchasing the pet
 * returns Order
 * */
const placeOrder = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        body
      }))
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      ))
    }
  }
)

module.exports = {
  deleteOrder,
  getInventory,
  getOrderById,
  placeOrder
}
