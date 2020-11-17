const Factory = require('../models/Factory')
const Segment = require('../models/Segment')
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
    const factory = req.body

    const {
      name,
      cnpj,
      description,
      role,
      mobilephone,
      address,
      isActive,
      segment_id,
    } = await Factory.create(factory)

    return res.json({
      name,
      cnpj,
      description,
      role,
      mobilephone,
      address,
      isActive,
      segment_id,
    })
  }

  async update(req, res) {
    const factoryID = req.params.factoryID

    const { nameFactory } = req.body

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
      mobilephone,
      address,
      isActive,
      segment,
    } = await factory.update({ name: nameFactory })

    return res.json({
      id,
      name,
      cnpj,
      description,
      mobilephone,
      address,
      isActive,
      segment,
    })
  }
}

module.exports = new FactoryController()
