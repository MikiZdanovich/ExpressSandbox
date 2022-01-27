const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      required: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      required: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      required: false
    },
    userStatus: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
