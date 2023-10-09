'use strict';
const {
  Model
} = require('sequelize');

const { formatDate } = require('../../utils/helperFunc.js');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    toJSON() {
      let obj = { ...this.get() };

      obj.createdAt = formatDate(this.createdAt);
      obj.updatedAt = formatDate(this.updatedAt);

      return obj;
    }

    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      validate: {
        min: {
          args: [-90],
          msg: 'Latitude must be between -90 and 90 degrees.',
        },
        max: {
          args: [90],
          msg: 'Latitude must be between -90 and 90 degrees.',
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      validate: {
        min: {
          args: [-180],
          msg: 'Longitude must be between -180 and 180 degrees.',
        },
        max: {
          args: [180],
          msg: 'Longitude must be between -180 and 180 degrees.',
        }
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: "Name must be between 1 and 50 characters long."
        }
      }
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        len: {
          args: [30, 450],
          msg: "description must be between 30 and 450 characters long."
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Spot;
};
