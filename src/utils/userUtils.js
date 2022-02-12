const bcrypt = require('bcryptjs')

function setUserParams (request) {
  const payload = {}
  Object.keys(request.body).forEach((property) => {
    if (property === 'password') {
      payload[property] = bcrypt.hashSync(request.body[property], 8)
    } else { payload[property] = request.body[property] }
  })
  return payload
}

module.exports = { setUserParams }
