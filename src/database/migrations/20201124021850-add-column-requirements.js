'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'jobs',
      'requirements',
      {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      {
        before: 'synonymsArray',
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobs', 'requirements')
  },
}
