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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      required: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: false
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
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  User.associate = (models) => {
    User.hasMany(models.Category, {
      foreignKey: {
        name: 'userId',
        allowNull: true
      },
      as: 'categories'
    });};
  return User
}
