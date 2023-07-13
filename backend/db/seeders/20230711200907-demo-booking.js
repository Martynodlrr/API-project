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
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
