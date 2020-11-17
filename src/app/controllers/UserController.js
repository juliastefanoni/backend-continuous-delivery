const User = require('../models/User')

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['user_id', 'email', 'passwordHash', 'isFactory'],
    })

    return res.json(users)
  }

  async store(req, res) {
    const user = req.body

    const { user_id, email, passwordHash, isFactory } = await User.create(user)

    return res.json({
      user_id,
      email,
      passwordHash,
      isFactory,
    })
  }
}

module.exports = new UserController()
