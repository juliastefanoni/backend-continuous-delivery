'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'jobs',
      'area_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'area', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      {
        before: 'synonymsArray',
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobs', 'area_id')
  },
}
