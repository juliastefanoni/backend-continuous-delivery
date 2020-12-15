const Yup = require('yup')
const jwt = require('jsonwebtoken')

const auth = require('../../config/auth')
const User = require('../models/User')

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação falhou. Por favor, tente novamente!' })
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta!' })
    }

    const { user_id, isFactory } = user

    return res.json({
      id: user_id,
      email,
      isFactory,
      token: jwt.sign({ user_id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    })
  }
}

module.exports = new SessionController()
