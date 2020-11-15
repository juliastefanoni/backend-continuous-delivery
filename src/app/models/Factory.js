const { DataTypes, Model } = require('sequelize')

class Factory extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        cnpj: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        mobilephone: DataTypes.INTEGER,
        address: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'factory',
        freezeTableName: true,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.segment, {
      foreignKey: 'segment_id',
      as: 'segment',
    })
  }
}

module.exports = Factory
