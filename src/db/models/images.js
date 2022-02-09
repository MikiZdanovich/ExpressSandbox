module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    data: {
      type: DataTypes.BLOB('long')
    }
  })
  // Image.associate = (models) => {
  //   Image.belongsToMany(models.Pet, { through: models.Pet })
  // }
  return Image
}
