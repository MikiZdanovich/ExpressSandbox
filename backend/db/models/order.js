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
    static associate (models) {
      // define association here
    }
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      required: true,
      foreignKey: true
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    shipDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM,
      values: ['placed', 'approved', 'delivered']
    },
    complete: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    sequelize,
    modelName: 'Order'
  })
  return Order
}
