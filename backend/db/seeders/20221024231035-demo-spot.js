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
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Aptos',
        state: 'CA',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'Peaceful Treehouse with Ocean View',
        description: "Inside, mid-century furniture and architectural details are made of natural materials like wood and stone setting a calming, sanctuary tone throughout. Curl up with a good read by the light streaming through floor to ceiling windows and under soaring wooden beams or tuck in for the evening by closing the sliding doors inspired by Japanese screens.",
        price: 393.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Atlanta',
        state: 'GA',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'Alpaca Treehouse in the Bamboo Forest',
        description: "The treehouse is built with all reclaimed architectural antiques, so staying here is like living a jewel box, an art project. Roosters crow nearby because you are on a working farm, in City of Atlanta. You are 15 feet above the forest floor, tucked into the middle of a 80- year old bamboo forest. And there are beautiful Bolivian suri alpacas (like a small llamas with dreadlocks) roaming: Paloma Piper, Caitlin Tastee, Elfie Fay Von Picklesprite, and Sunny Shevoun. We also have five gentle, calm llamas named Dali Llama and Llama Mia Figaro (Figgy), Campari (camel colored), Sophie (bay brown), and baby llama Llyra wandering about grazing.",
        price: 404.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Sanford',
        state: 'ME',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'The Canopy Treehouse, a Luxury Carbon Free Retreat',
        description: "Waking up in your treehouse, the first thing you feel is peace. No traffic, no sirens, no planes flying overhead. Only birdsong—the cry of a loon, the piping of a chickadee. Through the windows, you see only leaves, like green glass, filtering the early morning light. Below you, on the ground, a doe and her fawn pick their way down to the pond. They do not hurry, for there is nothing here to frighten them.",
        price: 449.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Remsen',
        state: 'NY',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'Ultra-Luxury Treehouse ~ Cable Bridge & Waterfall',
        description: "Spoil yourself by visiting this ultra-luxurious treehouse in the Adirondack Mountains. The elevated design, unique suspension bridge, and a plethora of high-end decor and details will leave you speechless. Step onto the covered porch to enjoy stunning forest views, sit by the fire pit, and gaze at the pond while roasting marshmallows.",
        price: 495.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Asheville',
        state: 'NC',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'Sanctuary, Treehouses of Serenity',
        description: "Take in the rustic, fairy tale vibe of this custom-made treehouse in the midst of towering white oaks. Recline in a rocking chair and watch the sunset over the mountains, or try your hand at some stargazing from the comfort of the deluxe double bed.",
        price: 393.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '8523 Lees Ridge Road',
        city: 'Bellingham',
        state: 'WA',
        country: 'United States',
        lat: 19.41,
        lng: -155.28,
        name: 'Pleasant Bay Lookout (epic sea view + hot tub)',
        description: "The Pleasant Bay Lookout is a small private room with a spectacular view. We love welcoming guests to this tucked-away oasis of peace and beauty. Guests access our family's home for bathroom and hot tub.",
        price: 145.00,
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
     return queryInterface.bulkDelete(options, null, {});
  }
};
