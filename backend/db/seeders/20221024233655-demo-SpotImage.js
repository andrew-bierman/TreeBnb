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
        url: 'https://a0.muscache.com/im/pictures/5628a2bf-76ef-4385-a054-217a25875fc5.jpg?im_w=1200',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/1cfb4f9d-e29c-4f2c-8200-d58125507763.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/5f6a9a88-4e21-43bb-a2a8-eb6ba62a312b.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/70cf837d-805b-4647-8116-f79e891eff7b.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/fbfaa184-09af-4d7e-834a-b14b1c982217.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/986b77d6-dd8d-4b2b-bdb4-6dae85f745ab.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d06ec2fa-3c7e-4bd5-864e-25374e0450c8.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/50477634-42c5-4b7f-85ae-dc3f683e8a40.jpg?im_w=1200',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/83755d98-8c59-4308-9c44-02222e6ff589.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/5b4e76e4-dbb2-44ad-b8d0-a002b2d3d769.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/0df064b0-fcf1-435c-95d3-2458f117a7cf.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/b61cee47-f9c7-4f91-b12b-d0e720dcf148.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/38e93d7b-23d2-4604-87c6-f8d226b7655f.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/f405147e-dc8d-4c53-a127-50e17ef729c3.jpg?im_w=1200',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/38794512-d935-4268-837e-246d470bde04.jpg?im_w=720',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/6fc231cc-ded8-43f1-854e-844e33f0dfe0.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/d297bacf-2202-4849-a92f-4d763f855ed7.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ee057eff-7fd7-48eb-a047-b896167e33ad.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a338b9af-07dc-4935-b18a-f18a90ecc195.jpg?im_w=1200',
        preview: false,
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
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/a34963a8-ebbb-455f-818e-07dd1142aad2.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/80b2ed41-8551-4d28-9873-596a68e9d354.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/e847cbe4-d928-4093-961a-d074d9c8bbb7.jpg?im_w=720',
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
