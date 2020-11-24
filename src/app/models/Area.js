const { DataTypes, Model } = require('sequelize')

class Area extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'area',
        freezeTableName: true,
      }
    )

    return this
  }
}

module.exports = Area
