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
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/e9b0262e-b243-4f1f-8a89-679e97aac94c.jpg?im_w=1200',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/20015a62-7fb9-40e8-b502-6233adad7147.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/58b19fe7-0401-4be8-9e77-23632f99b699.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/f1b53479-6e3e-4979-87c1-75f5dbd937cd.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/096d2f1b-e71c-4171-b158-fb6f100cada7.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/06575eb1-aa00-40b0-818f-6da3a5bc123a.jpg?im_w=960',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/b634e8ed-9d23-4aea-8bf4-ead8349aab4f.jpg?im_w=720',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/891ea7de-e332-4494-b4b1-6a21010d708c.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/78f5f495-e0ae-4775-a693-dd84b75ef124.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/3e8720de-23b8-483d-ac18-800028b0e90e.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/2be4e914-dfac-4453-8077-e8c8d9251c01.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/64410333-478b-411d-9217-9827afb1a1d7.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/9b6849e6-019b-46a5-a7d5-98736dcdeed2.jpg?im_w=960',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/701f23b4-e839-4818-ad3c-1cb4f44d1a7d.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/38c6e4ee-979f-40d0-b0f3-332d92c99f09.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/9c53450e-b125-4fdf-ad80-8b42bbc087d5.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/2c38742c-071b-4926-81d6-f4578c70bdf1.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/286546fe-44ff-40b9-8048-0c5fa9299e63.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/57102a64-ef3e-45de-94ca-6ba31e1b822a.jpg?im_w=720',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28436865/original/96bde4dc-c733-4780-8701-4fb97a2b440a.jpeg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28436865/original/72ebf44f-8b7e-4f18-ae7b-a5c80c45acc7.jpeg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/2cf71969-e76b-48a4-8540-3da9c25cefd2.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28436865/original/efd9b15d-07f4-418e-ab96-885b3d7c9a9d.jpeg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/32538832-412e-4614-a455-c5600a8e05de.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/064f83a5-aa1e-4048-9e7e-cdae10e952bb.jpg?im_w=960',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/b112c5d3-7773-4a53-b592-204c9e6b9b4c.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/d0c0d032-754a-4c73-bdd2-9c7a21d06ce1.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/060a89ae-7621-4975-b6ec-b6c27a6ba4b4.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/b3a76c33-8ebe-4ed7-8fbc-8670b946e4a6.jpg?im_w=720',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/b182997c-c5b6-4cba-ab4a-52c6c4dccf67.jpg?im_w=1200',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/54423442/fd506ced_original.jpg?im_w=960',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/8e9b3ae5-7fb0-46ef-8921-cc25ece8ba6a.jpg?im_w=480',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/fd847d91-1b38-42dc-83e6-84c8ae299466.jpg?im_w=480',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/ee09ccdd-2f8e-48a7-879d-e6e87d07d505.jpg?im_w=480',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/29186646/eaab2a37_original.jpg?im_w=4800',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/0bfbbd5a-ebcc-4645-ab3d-a3a214b2ec4b.jpg?im_w=1200',
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
     return queryInterface.bulkDelete(options, null, {});


  }
};
