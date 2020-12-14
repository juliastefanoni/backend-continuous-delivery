'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('factory', 'responsiblePerson', {
      type: Sequelize.STRING,
    })

    await queryInterface.addColumn('factory', 'agreeToTerms', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })

    await queryInterface.addColumn('factory', 'authorization', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('factory', 'responsiblePerson')
    queryInterface.removeColumn('factory', 'agreeToTerms')
    queryInterface.removeColumn('factory', 'authorization')
  },
}
