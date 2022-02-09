function isNotEmpty (item) {
  if (item && item !== '' && item !== null) {
    return true
  }
}

module.exports = { isNotEmpty }

console.log(isNotEmpty({ a: '' }))
