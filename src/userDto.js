module.exports = class UserDto {
  id;
  username;

  constructor (model) {
    this.id = model.id
    this.username = model.username
  }
}
