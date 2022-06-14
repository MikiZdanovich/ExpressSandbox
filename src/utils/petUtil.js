const { isNotEmpty } = require('./commonUtils')
const logger = require('./logger')
const fs = require('fs')

function setPetIdFromHeaders (request) {
  const petId = {
    ...(isNotEmpty(request.headers.id) && { id: request.headers.id })
  }
  return petId
}

function setGetPetsParams (request) {
  const petId = setPetIdFromHeaders(request)
  const petParams = {
    ...(isNotEmpty(request.query.status) && { status: request.query.status })
  }
  Object.assign(petParams, petId)
  return petParams
}

function setPostPetParams (request) {
  const payload = {}
  Object.keys(request.body).forEach((property) => {
    payload[property] = request.body[property]
  })
  return payload
}

function setUploadFilePayload (request) {
  const id = setPetIdFromHeaders(request)
  const payload = []
  const filename = request.body.filename || null
  if (request.files || Object.keys(request.files).length !== 0) {
    request.files.forEach((file) => {

      const fileData = fs.readFileSync(file.path, 'base64')
      payload.push({
          filename: filename || file.originalname,
          type: file.mimetype,
          data: fileData
        })
      
    })
    return { payload, id }
  }
}

module.exports = { setGetPetsParams, setPostPetParams, setPetIdFromHeaders, setUploadFilePayload }
