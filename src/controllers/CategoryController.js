const Controller = require('./Controller');
const CategoryService = require('../service/CategoryService.js')

const addCategory = async (request, response) => {
    requestBody = request.body
    categoryName = requestBody["name"]
    categoryDescription = requestBody["description"]
    userId = request.user["id"]
    category = await CategoryService.createCategory(categoryName, categoryDescription, userId)

    Controller.sendResponse(response, Controller.successResponse(category, 201))
}


const getCategory = async (request, response) => {
    categoryId = request.params["categoryId"]


    category = await CategoryService.getCategory(categoryId)

    if (!category) {
        Controller.sendResponse(response, Controller.successResponse("Not Found", 404))
    } else {

        Controller.sendResponse(response, Controller.successResponse(category, 200))
    }


}

module.exports = {
    addCategory,
    getCategory,
}