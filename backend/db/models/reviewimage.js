'use strict';
const {
  Model
} = require('sequelize');

const { formatDate } = require('../../utils/helperFunc.js');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    toJSON() {
      let obj = { ...this.get() };

      obj.createdAt = formatDate(this.createdAt);
      obj.updatedAt = formatDate(this.updatedAt);

      return obj;
    }

    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId'
      });
    }
  }
  ReviewImage.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reviews',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
