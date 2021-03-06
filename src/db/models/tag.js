const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      required: true
    }
  }, {
    sequelize,
    modelName: 'Tag'
  })
  Tag.associate = (models) => {

    Tag.belongsToMany(models.Pet, {
      through: "Pet_Tag",
      as: "pets",
      foreignKey: "tagId",
    });
  };
  return Tag
}
