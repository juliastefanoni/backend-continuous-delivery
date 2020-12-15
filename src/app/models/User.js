const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        passwordHash: DataTypes.STRING,
        isFactory: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'users',
        freezeTableName: true,
      }
    )

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.passwordHash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash)
  }
}

module.exports = User
