'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductImage.belongsTo(models.Product, { foreignKey: 'id', as: 'product' })
    }
  }
  ProductImage.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'product id cannot be empty'
        },
        isExist(value) {
          return sequelize.models.Product.findByPk(value).then((el) => {
            if (!el) {
              throw new Error("Product not found")
            }
          })
        },
      },
      defaultValue: 0
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};