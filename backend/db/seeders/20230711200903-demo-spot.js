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
    ownerId: 4,
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
    ownerId: 5,
    address: "1213 Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fifth Spot",
    description: "This is the fifth spot",
    price: 110.00
  },
  {
    ownerId: 1,
    address: "555 Sixth Ave",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Sixth Spot",
    description: "This is the sixth spot",
    price: 120.00
  },
  {
    ownerId: 2,
    address: "777 Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Seventh Spot",
    description: "This is the seventh spot",
    price: 180.00
  },
  {
    ownerId: 3,
    address: "999 Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Eighth Spot",
    description: "This is the eighth spot",
    price: 250.00
  },
  {
    ownerId: 4,
    address: "1212 Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Ninth Spot",
    description: "This is the ninth spot",
    price: 9999999999.99
  },
  {
    ownerId: 5,
    address: "1313 Tenth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Tenth Spot",
    description: "This is the tenth spot",
    price: 130.00
  },
  {
    ownerId: 1,
    address: "789 Eleventh St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Eleventh Spot",
    description: "This is the eleventh spot",
    price: 180.00
  },
  {
    ownerId: 2,
    address: "777 Twelfth St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Twelfth Spot",
    description: "This is the twelfth spot",
    price: 200.00
  },
  {
    ownerId: 3,
    address: "999 Thirteenth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Thirteenth Spot",
    description: "This is the thirteenth spot",
    price: 220.00
  },
  {
    ownerId: 4,
    address: "1212 Fourteenth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Fourteenth Spot",
    description: "This is the fourteenth spot",
    price: 130.00
  },
  {
    ownerId: 5,
    address: "1313 Fifteenth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fifteenth Spot",
    description: "This is the fifteenth spot",
    price: 160.00
  },
  {
    ownerId: 1,
    address: "789 Sixteenth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Sixteenth Spot",
    description: "This is the sixteenth spot",
    price: 110.00
  },
  {
    ownerId: 2,
    address: "777 Seventeenth St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Seventeenth Spot",
    description: "This is the seventeenth spot",
    price: 140.00
  },
  {
    ownerId: 3,
    address: "999 Eighteenth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Eighteenth Spot",
    description: "This is the eighteenth spot",
    price: 190.00
  },
  {
    ownerId: 4,
    address: "1212 Nineteenth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Nineteenth Spot",
    description: "This is the nineteenth spot",
    price: 85.00
  },
  {
    ownerId: 5,
    address: "1313 Twentieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Twentieth Spot",
    description: "This is the twentieth spot",
    price: 120.00
  },
  {
    ownerId: 1,
    address: "2321 Twenty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Twenty-First Spot",
    description: "This is the twenty-first spot",
    price: 120.00
  },
  {
    ownerId: 2,
    address: "2143 Twenty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Twenty-Second Spot",
    description: "This is the twenty-second spot",
    price: 170.00
  },
  {
    ownerId: 3,
    address: "3491 Twenty-Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Twenty-Third Spot",
    description: "This is the twenty-third spot",
    price: 210.00
  },
  {
    ownerId: 4,
    address: "1934 Twenty-Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Twenty-Fourth Spot",
    description: "This is the twenty-fourth spot",
    price: 75.00
  },
  {
    ownerId: 5,
    address: "1235 Twenty-Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Twenty-Fifth Spot",
    description: "This is the twenty-fifth spot",
    price: 140.00
  },
  {
    ownerId: 1,
    address: "5566 Twenty-Sixth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Twenty-Sixth Spot",
    description: "This is the twenty-sixth spot",
    price: 115.00
  },
  {
    ownerId: 2,
    address: "7878 Twenty-Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Twenty-Seventh Spot",
    description: "This is the twenty-seventh spot",
    price: 190.00
  },
  {
    ownerId: 3,
    address: "9999 Twenty-Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Twenty-Eighth Spot",
    description: "This is the twenty-eighth spot",
    price: 230.00
  },
  {
    ownerId: 4,
    address: "3030 Twenty-Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Twenty-Ninth Spot",
    description: "This is the twenty-ninth spot",
    price: 90.00
  },
  {
    ownerId: 5,
    address: "3131 Thirtieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Thirtieth Spot",
    description: "This is the thirtieth spot",
    price: 120.00
  },
  {
    ownerId: 1,
    address: "789 Thirty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Thirty-First Spot",
    description: "This is the thirty-first spot",
    price: 190.00
  },
  {
    ownerId: 2,
    address: "777 Thirty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Thirty-Second Spot",
    description: "This is the thirty-second spot",
    price: 210.00
  },
  {
    ownerId: 3,
    address: "999 Thirty-Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Thirty-Third Spot",
    description: "This is the thirty-third spot",
    price: 240.00
  },
  {
    ownerId: 4,
    address: "1212 Thirty-Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Thirty-Fourth Spot",
    description: "This is the thirty-fourth spot",
    price: 110.00
  },
  {
    ownerId: 5,
    address: "1313 Thirty-Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Thirty-Fifth Spot",
    description: "This is the thirty-fifth spot",
    price: 160.00
  },
  {
    ownerId: 1,
    address: "789 Thirty-Sixth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Thirty-Sixth Spot",
    description: "This is the thirty-sixth spot",
    price: 130.00
  },
  {
    ownerId: 2,
    address: "1337 Thirty-Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Thirty-Seventh Spot",
    description: "This is the thirty-seventh spot",
    price: 165.00
  },
  {
    ownerId: 3,
    address: "444 Fourthty-Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Thirty-Eighth Spot",
    description: "This is the thirty-eighth spot",
    price: 215.00
  },
  {
    ownerId: 4,
    address: "5678 Thirty-Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Thirty-Ninth Spot",
    description: "This is the thirty-ninth spot",
    price: 95.00
  },
  {
    ownerId: 5,
    address: "1313 Fortieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fortieth Spot",
    description: "This is the fortieth spot",
    price: 125.00
  },
  {
    ownerId: 1,
    address: "789 Forty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Forty-First Spot",
    description: "This is the forty-first spot",
    price: 170.00
  },
  {
    ownerId: 2,
    address: "777 Forty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Forty-Second Spot",
    description: "This is the forty-second spot",
    price: 190.00
  },
  {
    ownerId: 3,
    address: "999 Forty-Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Forty-Third Spot",
    description: "This is the forty-third spot",
    price: 230.00
  },
  {
    ownerId: 4,
    address: "1212 Forty-Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Forty-Fourth Spot",
    description: "This is the forty-fourth spot",
    price: 110.00
  },
  {
    ownerId: 5,
    address: "1313 Forty-Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Forty-Fifth Spot",
    description: "This is the forty-fifth spot",
    price: 160.00
  },
  {
    ownerId: 1,
    address: "789 Forty-Sixth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Forty-Sixth Spot",
    description: "This is the forty-sixth spot",
    price: 135.00
  },
  {
    ownerId: 2,
    address: "777 Forty-Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Forty-Seventh Spot",
    description: "This is the forty-seventh spot",
    price: 180.00
  },
  {
    ownerId: 3,
    address: "999 Forty-Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Forty-Eighth Spot",
    description: "This is the forty-eighth spot",
    price: 210.00
  },
  {
    ownerId: 4,
    address: "1212 Forty-Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Forty-Ninth Spot",
    description: "This is the forty-ninth spot",
    price: 80.00
  },
  {
    ownerId: 5,
    address: "1313 Fiftieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fiftieth Spot",
    description: "This is the fiftieth spot",
    price: 140.00
  },
  {
    ownerId: 1,
    address: "789 Fifty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Fifty-First Spot",
    description: "This is the fifty-first spot",
    price: 185.00
  },
  {
    ownerId: 2,
    address: "777 Fifty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Fifty-Second Spot",
    description: "This is the fifty-second spot",
    price: 205.00
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(options, data, { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["First Spot", "Second Spot", "Third Spot", "Fourth Spot", "Fifth Spot", "Sixth Spot", "Seventh Spot", "Eighth Spot", "Ninth Spot", "Tenth Spot", "Eleventh Spot", "Twelfth Spot", "Thirteenth Spot", "Fourteenth Spot", "Fifteenth Spot", "Sixteenth Spot", "Seventeenth Spot", "Eighteenth Spot", "Nineteenth Spot", "Twentieth Spot", "Twenty-First Spot", "Twenty-Second Spot", "Twenty-Third Spot", "Twenty-Fourth Spot", "Twenty-Fifth Spot", "Twenty-Sixth Spot", "Twenty-Seventh Spot", "Twenty-Eighth Spot", "Twenty-Ninth Spot", "Thirtieth Spot", "Thirty-First Spot", "Thirty-Second Spot", "Thirty-Third Spot", "Thirty-Fourth Spot", "Thirty-Fifth Spot", "Thirty-Sixth Spot", "Thirty-Seventh Spot", "Thirty-Eighth Spot", "Thirty-Ninth Spot", "Fortieth Spot", "Forty-First Spot", "Forty-Second Spot", "Forty-Third Spot", "Forty-Fourth Spot", "Forty-Fifth Spot", "Forty-Sixth Spot", "Forty-Seventh Spot", "Forty-Eighth Spot", "Forty-Ninth Spot", "Fiftieth Spot", "Fifty-First Spot", "Fifty-Second Spot"]
    }
    }, {});
  }
};
