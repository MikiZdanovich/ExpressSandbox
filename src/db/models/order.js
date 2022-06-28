'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Order.init({
    quantity: {
      type: DataTypes.INTEGER
    },
    shipDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM,
      values: ['placed', 'approved', 'delivered']
    }
  }, {
    sequelize,
    modelName: 'Order'
  }
  )
  Order.associate = (models) => {
    Order.belongsTo(models.Pet, {
      foreignKey: {
        name: 'petId',
        allowNull: false
      },
      as: 'orders'
    });
  };
  return Order
}
