const Controller = require('./Controller');
const CategoryService = require('../service/CategoryService.js');
const category = require('../db/models/category');

const addCategory = async (request, response) => {
    requestBody = request.body
    categoryName = requestBody["name"]
    categoryDescription = requestBody["description"]
    userId = request.user["id"]
    const category = await CategoryService.createCategory(categoryName, categoryDescription, userId)

    Controller.sendResponse(response, Controller.successResponse(category, 201))
}


const getCategory = async (request, response) => {
    categoryId = request.params["categoryId"]


    const category = await CategoryService.getCategory(categoryId)

    if (!category) {
        Controller.sendResponse(response, Controller.successResponse("Not Found", 404))
    } else {

        Controller.sendResponse(response, Controller.successResponse(category, 200))
    }
}

const getCategories = async(request, response) => {

    userId = request.user["id"]
    const categories = await CategoryService.getCategories(userId)
    Controller.sendResponse(response, Controller.successResponse(categories, 200))

}

module.exports = {
    addCategory,
    getCategory,
    getCategories,
    
}