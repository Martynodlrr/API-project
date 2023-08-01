'use strict';

let options = {};
options.tableName = 'Bookings'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

let startDate = new Date(Date.UTC(2021, 10, 19));
let endDate = new Date(Date.UTC(2023, 10, 20));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 2,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 3,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 4,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 5,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 6,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 7,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 8,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 9,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 10,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 11,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 12,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 13,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 14,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 15,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 16,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 17,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 18,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 19,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 20,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 21,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 22,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 23,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 24,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 25,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 26,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 27,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 28,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 29,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 30,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 31,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 32,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 33,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 34,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 35,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 36,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 37,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 38,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 39,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 40,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 41,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 42,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 43,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 44,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 45,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 46,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 47,
        userId: 2,
        startDate,
        endDate
      },
      {
        spotId: 48,
        userId: 3,
        startDate,
        endDate
      },
      {
        spotId: 49,
        userId: 4,
        startDate,
        endDate
      },
      {
        spotId: 50,
        userId: 5,
        startDate,
        endDate
      },
      {
        spotId: 51,
        userId: 1,
        startDate,
        endDate
      },
      {
        spotId: 52,
        userId: 2,
        startDate,
        endDate
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52
      ] }
    }, {});
  }
};
