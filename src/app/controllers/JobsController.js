const Jobs = require('../models/Jobs')
const CategoryOfWorker = require('../models/CategoryOfWorker')
const Seniority = require('../models/Seniority')

class JobsController {
  async index(req, res) {
    const jobs = await Jobs.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['title', 'address', 'description', 'isPublish'],
      include: [
        {
          model: CategoryOfWorker,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: Seniority,
          as: 'seniority',
          attributes: ['id', 'name'],
        },
      ],
    })

    return res.json(jobs)
  }

  async store(req, res) {
    const job = req.body

    const {
      id,
      title,
      address,
      description,
      isPublish,
      categoryofworker_id,
      seniority_id,
    } = await Jobs.create(job)

    return res.json({
      id,
      title,
      address,
      description,
      isPublish,
      categoryofworker_id,
      seniority_id,
    })
  }
}

module.exports = new JobsController()
