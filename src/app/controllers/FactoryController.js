const Yup = require('yup')
const Factory = require('../models/Factory')
const Segment = require('../models/Segment')
const User = require('../models/User')

class FactoryController {
  async index(req, res) {
    const factoryID = req.query.factoryID
    const active = req.query.active

    const rules = {
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'name',
        'cnpj',
        'description',
        'mobilephone',
        'address',
        'isActive',
      ],
      include: [
        {
          model: Segment,
          as: 'segment',
          attributes: ['id', 'name'],
        },
      ],
    }

    if (factoryID) {
      const factoryExists = await Factory.findOne({
        ...rules,
        where: {
          id: factoryID,
        },
      })

      if (!factoryExists) {
        return res.json({ error: 'Empresa não existe!' })
      }

      return res.json(factoryExists)
    }

    const factories = await Factory.findAll({
      ...rules,
      where: {
        isActive: active,
      },
    })

    return res.json(factories)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.number().min(14).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      responsiblePerson: Yup.string(),
      agreeToTerms: Yup.boolean(),
      authorization: Yup.boolean(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validação dos dados falhou! Verifique se preencheu todos os campos obrigatórios!',
      })
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    })

    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    const { id, name, cnpj } = await Factory.create(req.body)

    const { email, password } = await User.create({
      user_id: id,
      email: req.body.email,
      password: req.body.password,
      isFactory: true,
    })

    return res.json({
      name,
      cnpj,
      email,
      password,
    })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cnpj: Yup.number().min(14),
      description: Yup.string().min(100),
      address: Yup.string(),
      isActive: Yup.boolean(),
      segment_id: Yup.number(),
      responsiblePerson: Yup.string(),
      agreeToTerms: Yup.boolean(),
      authorization: Yup.boolean(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validação dos dados falhou! Verifique se preencheu todos os campos obrigatórios!',
      })
    }

    const factoryID = req.params.factoryID

    const factory = await Factory.findOne({
      where: {
        id: factoryID,
      },
      include: [
        {
          model: Segment,
          as: 'segment',
          attributes: ['id', 'name'],
        },
      ],
    })

    if (!factory) {
      return res.json({ error: 'Empresa não existe' })
    }

    const {
      id,
      name,
      cnpj,
      description,
      address,
      isActive,
      segment,
    } = await factory.update(req.body)

    return res.json({
      id,
      name,
      cnpj,
      description,
      address,
      isActive,
      segment,
    })
  }
}

module.exports = new FactoryController()
