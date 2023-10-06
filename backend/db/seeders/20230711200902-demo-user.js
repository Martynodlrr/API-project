'use strict';

const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@user.io',
        username: 'JohnDoe1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@user.io',
        username: 'JaneSmith2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Martyn',
        lastName: 'odlrr',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Lucas',
        lastName: 'Bennett',
        email: 'lucas.bennett@user.io',
        username: 'LucasBennett6',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
