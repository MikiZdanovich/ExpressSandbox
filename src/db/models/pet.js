module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.JSONB
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
  })
  // Pet.associate = (models) => {
  //   Pet.belongsTo(models.Order, { foreignKey: 'id', as: 'petId' })
  // }
  return Pet
}
