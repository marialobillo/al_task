module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Services',
    [
      {
        id_service: 'engineering jobs',
        value: JSON.stringify({'card-number': '333-222-333-444'}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_service: 'engineering jobs',
        value: JSON.stringify({'bb-number': '555-666-777-33'}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Services', null, {}),
};