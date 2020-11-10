const { DataTypes, Model } = require('sequelize')

class CategoryOfWorker extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'categoryOfWorker',
        freezeTableName: true,
      }
    )

    return this
  }
}

module.exports = CategoryOfWorker
