'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Reviews"

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
        spotId: 2,
        userId: 3,
        review: "Excellent stay",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 1,
        review: "Great stay",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 2,
        review: "I had a great stay at this luxurious treehouse! The hot tub was the perfect way to relax after a day exploring Old Fort and Black Mountain. The well-lit path to the treehouse made it easy to find, and the location was convenient for all the activities we had planned. Highly recommend!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 3,
        userId: 2,
        review: "This treehouse in the woods was exactly what we needed for a romantic getaway. The sounds of the stream just feet from the deck were so peaceful, and we loved waking up to the verdant views from the loft. The hosts were very helpful and made sure we had everything we needed for a comfortable stay. Can't wait to come back!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 4,
        userId: 2,
        review: "We had a good stay at this peaceful rainforest treehouse. The location was beautiful and secluded, and we enjoyed hiking in Hawaii Volcanoes National Park and exploring the nearby beaches and forests. However, the treehouse itself was a bit rustic and could have used some updates. Overall, a unique and enjoyable experience.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 5,
        userId: 2,
        review: "We absolutely loved our stay at this beautiful treehouse in the redwoods! The views from the deck were breathtaking, and the hot tub was the perfect way to end each day. The hosts were very friendly and made sure we had everything we needed. We can't wait to come back and spend more time in this serene and peaceful setting.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 6,
        userId: 2,
        review: "We had a wonderful stay at this cozy treehouse in the mountains. The location was perfect for exploring the surrounding area, and the treehouse itself was charming and comfortable. The hot tub was a nice added bonus. The only downside was that the treehouse was a bit small for four adults, but we managed to make it work. Overall, a great experience!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 7,
        userId: 2,
        review: "The treehouse was a great place to stay for a weekend getaway. It was clean and well-equipped, and the location was perfect for exploring the surrounding area. The hosts were very welcoming and made sure we had everything we needed. Highly recommend this spot!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 8,
        userId: 2,
        review: "We had a great stay at the treehouse. It was clean and comfortable, and the outdoor shower was a nice touch. The location was perfect for exploring the local hiking trails and the hosts were very helpful with recommendations. We would definitely stay here again!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 9,
        userId: 2,
        review: "The treehouse was a great place to stay for our vacation. It was clean, comfortable, and well-equipped. The outdoor shower was a nice touch and the location was perfect for exploring the surrounding area. The hosts were very helpful and provided great recommendations. We would definitely stay here again!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        spotId: 10,
        userId: 2,
        review: "We had a wonderful time at the treehouse. It was cozy and comfortable, and the outdoor shower was a nice touch. The location was perfect for exploring the surrounding area and the hosts were very helpful and friendly. We would definitely stay here again!",
        stars: 4,
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
