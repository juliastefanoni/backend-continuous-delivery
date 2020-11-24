const Jobs = require('../models/Jobs')
const CategoryOfWorker = require('../models/CategoryOfWorker')
const Seniority = require('../models/Seniority')
const Factory = require('../models/Factory')
const Area = require('../models/Area')
class JobsController {
  async index(req, res) {
    const factoryID = req.query.factoryID
    const jobID = req.query.jobID
    const publish = req.query.publish

    const rules = {
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'address',
        'description',
        'role',
        'isPublish',
        'isForPCD',
        'synonymsArray',
        'requirements',
      ],
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
        {
          model: Factory,
          as: 'factory',
          attributes: ['id', 'name'],
        },
        {
          model: Area,
          as: 'area',
          attributes: ['id', 'name'],
        },
      ],
    }

    if (factoryID) {
      const where = publish
        ? { factory_id: factoryID, isPublish: publish }
        : { factory_id: factoryID }

      const jobsFiltered = await Jobs.findAll({
        where: where,
        ...rules,
      })

      if (jobsFiltered.length < 1) {
        return res.json({ error: 'Não foi possível encontrar essa vaga!' })
      }

      return res.json(jobsFiltered)
    }

    if (jobID) {
      const jobsFiltered = await Jobs.findAll({
        where: { id: jobID },
        ...rules,
      })

      if (jobsFiltered.length < 1) {
        return res.json({ error: 'Não foi possível encontrar essa vaga!' })
      }

      return res.json(jobsFiltered)
    }

    if (publish) {
      const jobsWithFilterPublish = await Jobs.findAll({
        ...rules,
        where: { isPublish: publish },
      })

      return res.json(jobsWithFilterPublish)
    }

    return res.json(await Jobs.findAll(rules))
  }

  async store(req, res) {
    const job = req.body

    const {
      id,
      title,
      address,
      description,
      role,
      isPublish,
      isForPCD,
      synonymsArray,
      requirements,
      area_id,
      categoryofworker_id,
      seniority_id,
      factory_id,
    } = await Jobs.create(job)

    return res.json({
      id,
      title,
      address,
      description,
      role,
      isPublish,
      isForPCD,
      synonymsArray,
      requirements,
      area_id,
      categoryofworker_id,
      seniority_id,
      factory_id,
    })
  }

  async update(req, res) {
    const jobID = req.params.jobID
    const factoryID = req.params.factoryID

    const { isPublish, title } = req.body

    const job = await Jobs.findOne({
      where: {
        id: jobID,
        factory_id: factoryID,
      },
    })

    const jobUpdated = await job.update({ isPublish, title })

    return res.json(jobUpdated)
  }
}

module.exports = new JobsController()
