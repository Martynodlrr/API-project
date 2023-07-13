'use strict';

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        spotId: 1,
        url: "https://example.com/image1.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://example.com/image2.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://example.com/image3.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://example.com/image4.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://example.com/image5.jpg",
        preview: false
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
