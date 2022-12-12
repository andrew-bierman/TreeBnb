'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"

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
        url: 'https://thehaphazardtraveler.com/wp-content/uploads/2022/02/Best-Airbnb-in-Washington-DC-1024x768.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://www.territorysupply.com/wp-content/uploads/2021/01/earth-house-airbnb-boulder.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://bloximages.newyork1.vip.townnews.com/fauquier.com/content/tncms/assets/v3/editorial/7/3a/73a6a810-2a9c-11e7-adb9-e77bd0abb952/5900c964f35f8.image.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/80f8c5db-5bfb-4ecd-a93d-4b0f5d29496d.jpg?im_w=1200',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/7d18415c-91d1-40e9-92af-cf381446b8eb.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/7d18415c-91d1-40e9-92af-cf381446b8eb.jpg?im_w=720',
        preview: false,
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
     return queryInterface.bulkDelete(options, {
       spotId: { [Op.in]: [1, 2, 3] }
     }, {});


  }
};
