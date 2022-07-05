module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    filename:  DataTypes.STRING,
    data: DataTypes.BLOB('long')
  })
  Image.associate = (models) => {
    Image.belongsTo(models.Pet, {
      foreignKey: {
        name: 'petId',
        allowNull: false
      },
      as: 'images'
    });
  };
  return Image
}
