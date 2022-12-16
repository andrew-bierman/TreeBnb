'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "ReviewImages"

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
        reviewId: 1,
        url: 'www.reviewImage.com/1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 2,
        url: 'www.reviewImage.com/2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 3,
        url: 'www.reviewImage.com/3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
     return queryInterface.bulkDelete(options, null, {});
  }
};
