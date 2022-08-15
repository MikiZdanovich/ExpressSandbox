'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  
  Category.init(
    {
    name: {type: DataTypes.STRING, unique: false},
    description: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'Category'
  }
  )
  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'categories'
    });

    Category.hasMany(models.Pet, {
      foreignKey: {
        name: 'categoryId',
        allowNull: true
      },
      as: 'pets'
    });

  };
  return Category
}
