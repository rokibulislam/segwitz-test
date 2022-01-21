'use strict';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomFloatFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}

module.exports = {
  async up (queryInterface, Sequelize) {

      var dummyJSON = [];

      var regions = [ "Dhaka", "Chittagong", "Sylhet", "Rajshai", "Khulna", "Barisal", "Rangpur", "cumilla" ];
      
      for(var i = 0 ; i < 500 ; i++){
        dummyJSON.push({
          username: 'abc',
          date: randomDate(new Date(2022, 0, 1), new Date()),
          amount: randomFloatFromInterval(1000, 100000),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      await queryInterface.bulkInsert('sales', dummyJSON, {} );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
