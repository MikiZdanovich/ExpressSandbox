const Pet = require('../db/models')

const getPetsByTags = async (req, res) => {
  const tagsToSearch = req.params
  const petsByTags = await Pet.findOne({
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

const addPet = async (req, res) => {
  const reqBody = req.body
  if (reqBody != null) {
    const newPet = await Pet.create({
      name: reqBody.name,
      photoUrls: reqBody.photoUrls

    })
    res.status(201)
    console.log(newPet)
  }
  res.status(201).send(req.body)
}

module.exports = { getPetsByTags, addPet }
