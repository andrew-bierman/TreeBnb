'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Spots"

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
        ownerId: 1,
        address: '4423 Sample Street',
        city: 'Washington',
        state: 'D.C.',
        country: 'United States',
        lat: 38.9,
        lng: -77.0,
        name: 'DC Villa',
        description: 'Lovely house in Washington DC',
        price: 100.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '1511 Maple Street',
        city: 'Boulder',
        state: 'CO',
        country: 'United States',
        lat: 40.00,
        lng: -105.00,
        name: 'Boulder Lodge',
        description: 'Lovely lodge in Boulder CO',
        price: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Warrenton',
        state: 'VA',
        country: 'United States',
        lat: 38.9,
        lng: -77.0,
        name: 'VA Estate',
        description: 'Wonderful estate in Warrenton VA',
        price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Volcano',
        state: 'HI',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'Peaceful Rainforest Treehouse Retreat',
        description: "Our Retreat is a labor of our love and was built as such. A getaway to relax, hike the nearby beaches, forests, and volcanoes and to simply enjoy life. Our place is a peaceful spot completely off the grid in nature. It is 8 miles to Hawai'i Volcanoes National Park. You’ll love our place because of the location, the ambiance, and the outdoor space. Our goal was to bring the outdoors in and the indoors outside. Our place is good for couples and solo adventurers.",
        price: 175.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);

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
       name: { [Op.in]: ['DC Villa', 'Boulder Lodge', 'VA Estate'] }
     }, {});
  }
};
