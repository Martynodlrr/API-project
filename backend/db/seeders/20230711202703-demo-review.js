'use strict';

let options = {};
options.tableName = 'Reviews'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        spotId: 1,
        userId: 1,
        review: "Great spot! Highly recommended.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: "Nice location and amenities.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "Average experience. Could be better.",
        stars: 3
      },
      {
        spotId: 4,
        userId: 2,
        review: "Decent spot for the price.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: "Not satisfied with the cleanliness.",
        stars: 2
      }
    ];

    await queryInterface.bulkInsert(options, data, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
