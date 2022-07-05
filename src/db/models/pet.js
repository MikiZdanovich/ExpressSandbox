module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['available', 'pending', 'sold']
    }}
  )
  Pet.associate = (models) => {
    Pet.hasMany(models.Image, {
      foreignKey: {
        name: 'petId',
        allowNull: true
      },
      as: 'images'
    });
    Pet.hasMany(models.Order, {
      foreignKey: {
        name: 'petId',
        allowNull: true
      },
      as: 'orders'
    });

    Pet.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
      as: 'categories'
    });
    Pet.belongsToMany(models.Tag, {
      through: "Pet_Tag",
      as: "tags",
      foreignKey: "petId",
    });
  };
  return Pet
}
