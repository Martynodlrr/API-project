'use strict';

let options = {};
options.tableName = 'Spots'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

const data = [
  {
    ownerId: 1,
    address: "123 First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "First Spot",
    description: "This is the first spot",
    price: 100.00
  },
  {
    ownerId: 2,
    address: "456 Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Second Spot",
    description: "This is the second spot",
    price: 150.00
  },
  {
    ownerId: 3,
    address: "789 Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Third Spot",
    description: "This is the third spot",
    price: 200.00
  },
  {
    ownerId: 1,
    address: "1011 Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Fourth Spot",
    description: "This is the fourth spot",
    price: 80.00
  },
  {
    ownerId: 2,
    address: "1213 Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fifth Spot",
    description: "This is the fifth spot",
    price: 110.00
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(options, data, { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["First Spot", "Second Spot", "Third Spot", "Fourth Spot", "Fifth Spot"] }
    }, {});
  }
};
