'use strict';

let options = {};
options.tableName = 'Bookings'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-07-01',
        endDate: '2023-07-05'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-08-10',
        endDate: '2023-08-15'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-09-20',
        endDate: '2023-09-25'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2023-10-05',
        endDate: '2023-10-10'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2023-11-15',
        endDate: '2023-11-20'
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
