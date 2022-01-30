function isExists (Model, input) {
  const instance = Model.findAll({
    where: {
      id: Number(input)
    }
  })
  return instance !== null
}

module.exports = {
  isExists
}
