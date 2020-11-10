const { DataTypes, Model } = require('sequelize')

class Jobs extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        isPublish: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'jobs',
        freezeTableName: true,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.categoryOfWorker, {
      foreignKey: 'categoryofworker_id',
      as: 'category',
    })

    this.belongsTo(models.seniority, {
      foreignKey: 'seniority_id',
      as: 'seniority',
    })
  }
}

module.exports = Jobs
