const CategoryOfWorker = require('../models/CategoryOfWorker')

class CategoryOfWorkerController {
  async index(req, res) {
    const categories = await CategoryOfWorker.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
    })

    return res.json(categories)
  }

  async store(req, res) {
    const category = req.body

    const { id, name } = await CategoryOfWorker.create(category)

    return res.json({ id, name })
  }
}

module.exports = new CategoryOfWorkerController()
