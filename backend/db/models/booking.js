'use strict';
const {
  Model
} = require('sequelize');

const { formatDate } = require('../../utils/helperFunc.js');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    toJSON() {
      const obj = { ...this.get() };
      obj.createdAt = formatDate(obj.createdAt);
      obj.updatedAt = formatDate(obj.updatedAt);
      obj.startDate = formatDate(obj.startDate);
      obj.endDate = formatDate(obj.endDate);
      return obj;
    }

    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Booking.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
    }
  }
  Booking.init({
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
    timestamps: true
  });
  return Booking;
};
