'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Services',
    [
      {
        id_service: 'c20ad4d76fe97759aa27a0c99bff6710',
        encryption_key: 'qe10adc3949ba59abbe56e057f20f883e',
        value: JSON.stringify(["credit_card", "bank_transfer"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_service: 'c51ce410c124a10e0db5e4b97fc2af39',
        encryption_key: '01cfcd4f6b8770febfb40cb906715822',
        value: JSON.stringify(["credit_card", "bank_transfer"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Services', null, {}),
};