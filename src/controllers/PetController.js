const models = require('../db/models')
const { isExists } = require('../utils/petUtil')
const Controller = require('../controllers/Controller')
const service = require('../service/petService')

const getPets = async (req, res) => {
  await Controller.handleRequest(req, res, service.getPets)
}

// const getPets = async (req, res) => {
//   const listPets = await models.Pet.findAll()
//
//   res.status(200).json(listPets)
// }

const addPet = async (req, res) => {
  await Controller.handleRequest(req, res, service.addPet)
}

const getPetsByTags = async (req, res) => {
  const tagsToSearch = req.params
  const petsByTags = await models.Pet.findOne({
    where: {
      tags: tagsToSearch
    }
  }).toJSON
  if (petsByTags != null) {
    res.status(200).json({ petsByTags })
  } else {
    res.status(404)
  }
}

// const addPet = async (req, res) => {
//   const payload = req.body
//   try {
//     const newPet = await models.Pet.create({
//       payload
//     })
//     res.status(201).send(`Pet with id ${newPet.id} Created`)
//   } catch (e) {
//     res.status(400).json({
//       name: e.name,
//       errors: {
//         message: Array.from(e.errors.map(error => error.message))
//       }
//     })
//   }
// }

const updatePet = async (req, res) => {
  const payload = req.body
  const id = payload.id
  if (!id && !(Number.isInteger(+id))) {
    res.status(400).send(`Not valid id:${id}. Should be integer!`)
  } else if (!isExists(models.Pet, id)) {
    res.status(404).send(`Pet with id:${id} not found.`)
  } else {
    try {
      await models.Pet.update(payload, {
        where: { id: id }
      })
      res.status(200).end()
    } catch (e) {
      res.status(400).json(e)
    }
  }
}

module.exports = { getPetsByTags, addPet, getPets, updatePet }
