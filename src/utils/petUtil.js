function setGetPetsParams(request) {
  const petParams = {
    ...(isNotEmpty(request.query.status) && { status: request.query.status }),
  };
  Object.assign(petParams, petId);
  return petParams;
}

module.exports = { setGetPetsParams };
