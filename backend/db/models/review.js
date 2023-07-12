'use strict';
const {
  Model
} = require('sequelize');

const { formatDate } = require('../../utils/helperFunc.js');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    toJSON() {
      let obj = { ...this.get() };

      obj.createdAt = formatDate(this.createdAt);
      obj.updatedAt = formatDate(this.updatedAt);

      return obj;
    }

    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
