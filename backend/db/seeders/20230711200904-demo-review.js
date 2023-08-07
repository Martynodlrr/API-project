'use strict';

let options = {};
options.tableName = 'Reviews'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        spotId: 2,
        userId: 1,
        review: "Great spot! Highly recommended.",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 2,
        review: "Nice location and amenities.",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 3,
        review: "Average experience. Could be better.",
        stars: 3,
      },
      {
        spotId: 5,
        userId: 4,
        review: "Decent spot for the price.",
        stars: 3,
      },
      {
        spotId: 6,
        userId: 5,
        review: "Not satisfied with the cleanliness.",
        stars: 1,
      },
      {
        spotId: 3,
        userId: 2,
        review: "so fun",
        stars: 3,
      },
      {
        spotId: 4,
        userId: 3,
        review: "woo-pee",
        stars: 3,
      },
      {
        spotId: 5,
        userId: 4,
        review: "yay",
        stars: 2,
      },
      {
        spotId: 7,
        userId: 1,
        review: "Exceptional service and atmosphere.",
        stars: 4,
      },
      {
        spotId: 8,
        userId: 2,
        review: "Very clean and comfortable.",
        stars: 5,
      },
      {
        spotId: 9,
        userId: 4,
        review: "Hands down the best experience",
        stars: 5,
      },
      {
        spotId: 10,
        userId: 3,
        review: "Decent but not impressive.",
        stars: 2,
      },
      {
        spotId: 11,
        userId: 5,
        review: "Quite expensive for the value.",
        stars: 2,
      },
      {
        spotId: 12,
        userId: 1,
        review: "Lovely outdoor seating area.",
        stars: 3,
      },
      {
        spotId: 13,
        userId: 2,
        review: "Great spot for breakfast.",
        stars: 4,
      },
      {
        spotId: 14,
        userId: 3,
        review: "A bit too noisy.",
        stars: 3,
      },
      {
        spotId: 15,
        userId: 4,
        review: "Amazing views from the terrace.",
        stars: 5,
      },
      {
        spotId: 16,
        userId: 5,
        review: "Parking area is not sufficient.",
        stars: 2,
      },
      {
        spotId: 17,
        userId: 1,
        review: "Fantastic ambiance and cocktails.",
        stars: 5,
      },
      {
        spotId: 18,
        userId: 2,
        review: "Not the best service.",
        stars: 2,
      },
      {
        spotId: 19,
        userId: 3,
        review: "Great for family dinners.",
        stars: 4,
      },
      {
        spotId: 20,
        userId: 4,
        review: "Too crowded in weekends.",
        stars: 3,
      },
      {
        spotId: 21,
        userId: 5,
        review: "Very friendly and helpful staff.",
        stars: 4,
      },
      {
        spotId: 22,
        userId: 1,
        review: "Love the atmosphere here.",
        stars: 5,
      },
      {
        spotId: 23,
        userId: 2,
        review: "Clean and well maintained.",
        stars: 4,
      },
      {
        spotId: 24,
        userId: 3,
        review: "Not the best coffee.",
        stars: 2,
      },
      {
        spotId: 25,
        userId: 4,
        review: "Great place for meetings.",
        stars: 4,
      },
      {
        spotId: 26,
        userId: 5,
        review: "Music was too loud.",
        stars: 3,
      },
      {
        spotId: 27,
        userId: 1,
        review: "Healthy and delicious meals.",
        stars: 4,
      },
      {
        spotId: 28,
        userId: 2,
        review: "Service could be better.",
        stars: 3,
      },
      {
        spotId: 29,
        userId: 3,
        review: "Charming and cozy ambiance.",
        stars: 5,
      },
      {
        spotId: 30,
        userId: 4,
        review: "Slow service, good food.",
        stars: 3,
      },
      {
        spotId: 31,
        userId: 5,
        review: "Awesome live music here.",
        stars: 4,
      },
      {
        spotId: 32,
        userId: 1,
        review: "A bit too pricey.",
        stars: 2,
      },
      {
        spotId: 33,
        userId: 2,
        review: "Ideal for date nights.",
        stars: 5,
      },
      {
        spotId: 34,
        userId: 3,
        review: "Not enough vegetarian options.",
        stars: 3,
      },
      {
        spotId: 35,
        userId: 4,
        review: "Fast service and great food.",
        stars: 5,
      },
      {
        spotId: 36,
        userId: 5,
        review: "Great cocktails but loud music.",
        stars: 3,
      },
      {
        spotId: 37,
        userId: 1,
        review: "Outdoor seating is fantastic.",
        stars: 4,
      },
      {
        spotId: 38,
        userId: 2,
        review: "Family-friendly and great service.",
        stars: 5,
      },
      {
        spotId: 39,
        userId: 3,
        review: "Food is just average.",
        stars: 2,
      },
      {
        spotId: 40,
        userId: 4,
        review: "Very clean and modern.",
        stars: 4,
      },
      {
        spotId: 41,
        userId: 5,
        review: "Limited menu but good food.",
        stars: 3,
      },
      {
        spotId: 42,
        userId: 1,
        review: "Nice atmosphere and friendly staff.",
        stars: 4,
      },
      {
        spotId: 43,
        userId: 2,
        review: "Perfect for brunches.",
        stars: 5,
      },
      {
        spotId: 44,
        userId: 3,
        review: "Too crowded during peak hours.",
        stars: 3,
      },
      {
        spotId: 45,
        userId: 4,
        review: "Authentic cuisine, loved it.",
        stars: 5,
      },
      {
        spotId: 46,
        userId: 5,
        review: "Small portions for the price.",
        stars: 3,
      },
      {
        spotId: 47,
        userId: 1,
        review: "Excellent service and friendly staff.",
        stars: 5,
      },
      {
        spotId: 48,
        userId: 2,
        review: "The best coffee in town.",
        stars: 4,
      },
      {
        spotId: 49,
        userId: 3,
        review: "Decent food, nothing special.",
        stars: 3,
      },
      {
        spotId: 50,
        userId: 4,
        review: "Nice place but needs renovation.",
        stars: 3,
      },
      {
        spotId: 51,
        userId: 5,
        review: "Incredible spot, highly recommend!",
        stars: 5,
      },
      {
        spotId: 52,
        userId: 1,
        review: "Great food but long wait.",
        stars: 3,
      }
    ];


    await queryInterface.bulkInsert(options, data, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
          51, 52
        ]
      }
    }, {});
  }
};
