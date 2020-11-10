const { DataTypes, Model } = require('sequelize')

class Seniority extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'seniority',
        freezeTableName: true,
      }
    )

    return this
  }
}

module.exports = Seniority
