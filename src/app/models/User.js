const { DataTypes, Model } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        email: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        isFactory: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'users',
        freezeTableName: true,
      }
    )

    return this
  }
}

module.exports = User
