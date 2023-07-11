'use strict';

let options = {};
options.tableName = 'ReviewImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        reviewId: 1,
        url: "https://example.com/image1.jpg"
      },
      {
        reviewId: 1,
        url: "https://example.com/image2.jpg"
      },
      {
        reviewId: 2,
        url: "https://example.com/image3.jpg"
      },
      {
        reviewId: 2,
        url: "https://example.com/image4.jpg"
      },
      {
        reviewId: 3,
        url: "https://example.com/image5.jpg"
      }
    ];

    await queryInterface.bulkInsert(options, data, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://example.com/image1.jpg", "https://example.com/image2.jpg", "https://example.com/image3.jpg", "https://example.com/image4.jpg", "https://example.com/image5.jpg"] }
    }, {});
  }
};
