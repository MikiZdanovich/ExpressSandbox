function isNotEmpty (item) {
  if (item && item !== '' && item !== null) {
    return true
  }
}

module.exports = { isNotEmpty }
