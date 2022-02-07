const fs = require('fs')
const path = require('path')
const config = require('../../config/config')
const logger = require('../../logger')

class Controller {
  static sendResponse (response, payload) {
    response.status(payload.code || 200)

    const responsePayload = payload.payload

    if (responsePayload instanceof Object || responsePayload instanceof Array) {
      responsePayload.status = payload.code
      response.json(responsePayload)
    } else if (responsePayload) {
      response.send(responsePayload)
    } else {
      response.end()
    }
  }

  static sendError (response, error) {
    response.status(error.code || 500)
    if (error.error instanceof Object) {
      response.json(error.error)
    } else {
      response.send(error.error || error.message).end()
    }

    return error
  }

  /**
   * Files have been uploaded to the directory defined by config.js as upload directory
   * Files have a temporary name, that was saved as 'filename' of the file object that is
   * referenced in reuquest.files array.
   * This method finds the file and changes it to the file name that was originally called
   * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
   * the filename and its extension
   * @param request
   * @param fieldName
   * @returns {string}
   */
  static collectFile (request, fieldName) {
    let uploadedFileName = ''
    if (request.files && request.files.length > 0) {
      const fileObject = request.files.find(file => file.fieldname === fieldName)
      if (fileObject) {
        const fileArray = fileObject.originalname.split('.')
        const extension = fileArray.pop()
        fileArray.push(`_${Date.now()}`)
        uploadedFileName = `${fileArray.join('')}.${extension}`
        fs.renameSync(path.join(config.FILE_UPLOAD_PATH, fileObject.filename),
          path.join(config.FILE_UPLOAD_PATH, uploadedFileName))
      }
    }
    return uploadedFileName
  }

  static collectRequestParams (request) {
    const requestParams = {}
    const content = request.headers
    if (Object.entries(request.query).length !== 0) {
      Object.keys(request.query).forEach((property) => {
        requestParams[property] = request.query[property]
      })
    }
    if (Object.entries(request.body).length !== 0) {
      if (content['content-type'] === 'application/json') {
        Object.keys(request.body).forEach((property) => {
          requestParams[property] = request.body[property]
        })
      }
    } else if (content['content-type'] === 'multipart/form-data') {
      Object.keys(content['multipart/form-data'].schema.properties).forEach(
        (property) => {
          const propertyObject = content['multipart/form-data'].schema.properties[property]
          if (propertyObject.format !== undefined && propertyObject.format === 'binary') {
            requestParams[property] = this.collectFile(request, property)
          } else {
            requestParams[property] = request[property]
          }
        }
      )
    }

    if (Object.entries(request.params).length !== 0) {
      Object.keys(request.params).forEach((property) => {
        requestParams[property] = request.params[property]
      })
    }
    if (request.headers.id) {
      requestParams.id = request.headers.id
    }

    removeEmpty(requestParams)

    return requestParams
  }

  static async handleRequest (request, response, serviceOperation) {
    try {
      const serviceResponse = await serviceOperation(this.collectRequestParams(request))
      Controller.sendResponse(response, serviceResponse)
    } catch (error) {
      logger.error(error)
      Controller.sendError(response, error)
    }
  }
}

function removeEmpty (obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null & v !== '' & v !== undefined)
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  )
}

module.exports = Controller
