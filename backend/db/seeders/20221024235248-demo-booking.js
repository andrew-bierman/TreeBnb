'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Bookings"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-11-05",
        endDate: "2022-11-06",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2022-11-07",
        endDate: "2022-11-08",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-11-05",
        endDate: "2022-11-09",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {
       spotId: { [Op.in]: [1, 2, 3] }
     }, {});
  }
};
