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
        city: 'Old Fort',
        state: 'NC',
        country: 'United States',
        lat: 38.9,
        lng: -77.0,
        name: 'Luxurious Secluded Romantic Treehouse with Hot Tub',
        description: 'Take a short walk on well lit path to an oasis in the woods. A swinging bridge welcomes you to a quiet, cozy home in the trees, surrounded by native Laurel and abundant hardwoods. Listen to the birds while having your morning coffee on the deck or relax in the hot tub below. The home is located on 14 acres. Old Fort is 10 minutes to Black Mountain and 20 minutes to Asheville.',
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
        name: 'Sanctuary Among the Trees',
        description: 'Celebrate love and life in a beautiful setting with old-growth cedars and lush gardens. Sleep next to an old-growth cedar climbing two floors and enjoy the verdant views from the loft in the double-sized bed. A private half bath is below the treehouse. Close to restaurants and nature attractions, we are a convenient hub for the Olympics and Mt. Rainier. Due to the nature of this treehouse, you must be in good physical shape to climb stairs, ladders and be under the weight limit of 200 lbs.',
        price: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Hardwick',
        state: 'VT',
        country: 'United States',
        lat: 38.9,
        lng: -77.0,
        name: 'Lovely Treehouse in the Woods next to Stream',
        description: "You will feel the stresses of life wash away as you sway in the trees and listen to the sounds of the beautiful stream just feet from the treehouse deck. You'll never want to leave! Enjoy a bit of solitude or some special alone time with a loved one. It's hard to beat Stone City Treehouse to make your time away special!",
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
