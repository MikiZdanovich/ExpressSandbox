const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  Pet.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    photoUrls: {
      type: DataTypes.JSONB
    },
    tags: {
      type: DataTypes.JSONB
    },
    status: {
      type: DataTypes.ENUM,
      values: ['available', 'pending', 'sold']
    }
  }, {
    sequelize,
    modelName: 'Pet'
  })
  return Pet
}
