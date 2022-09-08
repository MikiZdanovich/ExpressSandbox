const Controller = require('./Controller');
const CategoryService = require('../service/CategoryService.js');

const addCategory = async (request, response) => {

    Controller.handleRequest(request, response, async (request, response) => {
        requestBody = request.body
        categoryName = requestBody["name"]
        categoryDescription = requestBody["description"]
        userId = request.user["id"]
        const category = await CategoryService.createCategory(categoryName, categoryDescription, userId)
        console.log(category)
        return Controller.successResponse(category, 201)
    })

}



const getCategory = async (request, response) => {
    Controller.handleRequest(request, response, async (request, response) => {
        categoryId = request.params["categoryId"]
        const category = await CategoryService.getCategory(categoryId)
        if (!category) {
            return Controller.successResponse("Not Found", 404)
        } else {
            return Controller.successResponse(category, 200)
        }
    })
}

const getCategories = async (request, response) => {
    Controller.handleRequest(request, response, async (request, response) => {
        userId = request.user["id"]
        const categories = await CategoryService.getCategories(userId)
        return Controller.successResponse(categories, 200)
    })
}

module.exports = {
    addCategory,
    getCategory,
    getCategories,

}