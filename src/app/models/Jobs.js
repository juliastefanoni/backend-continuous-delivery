const { DataTypes, Model } = require('sequelize')

class Jobs extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        role: DataTypes.STRING,
        isPublish: DataTypes.BOOLEAN,
        isForPCD: DataTypes.BOOLEAN,
        synonymsArray: DataTypes.ARRAY(DataTypes.STRING),
        requirements: DataTypes.TEXT,
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

    this.belongsTo(models.factory, {
      foreignKey: 'factory_id',
      as: 'factory',
    })

    this.belongsTo(models.area, {
      foreignKey: 'area_id',
      as: 'area',
    })
  }
}

module.exports = Jobs
