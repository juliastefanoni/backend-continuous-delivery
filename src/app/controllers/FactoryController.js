const Factory = require('../models/Factory')
const Segment = require('../models/Segment')

class FactoryController {
  async index(req, res) {
    const factories = await Factory.findAll({
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
}

module.exports = new FactoryController()
