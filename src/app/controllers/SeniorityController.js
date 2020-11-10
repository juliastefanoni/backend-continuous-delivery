const Seniority = require('../models/Seniority')

class SeniorityController {
  async index(req, res) {
    const seniorities = await Seniority.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
    })

    return res.json(seniorities)
  }

  async store(req, res) {
    const seniority = req.body

    const { id, name } = await Seniority.create(seniority)

    return res.json({ id, name })
  }
}

module.exports = new SeniorityController()
