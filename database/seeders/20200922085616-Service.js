module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Services',
    [
      {
        id: 'engineering-jobs',
        value: JSON.stringify({ firstName: "Jane", lastName: "Doe" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'marketing-jobs',
        value: JSON.stringify({ firstName: "Jon", lastName: "Doe" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Services', null, {}),
};