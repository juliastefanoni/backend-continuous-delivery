const Area = require('../models/Area')

class AreaController {
  async index(req, res) {
    const areas = await Area.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
    })

    return res.json(areas)
  }

  async store(req, res) {
    const area = req.body

    const { id, name } = await Area.create(area)

    return res.json({ id, name })
  }
}

module.exports = new AreaController()
