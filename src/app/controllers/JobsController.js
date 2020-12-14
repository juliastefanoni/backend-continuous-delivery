const Yup = require('yup')

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
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      address: Yup.string().required(),
      description: Yup.string().required().min(100),
      role: Yup.string().required(),
      isPublish: Yup.boolean().required(),
      isForPCD: Yup.boolean().required(),
      synonymsArray: Yup.array().of(Yup.string()).optional(),
      requirements: Yup.string().required(),
      categoryofworker_id: Yup.number().required(),
      area_id: Yup.number().required(),
      seniority_id: Yup.number().required(),
      factory_id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validação dos dados falhou! Verifique se preencheu todos os campos obrigatórios!',
      })
    }

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

    const schema = Yup.object().shape({
      title: Yup.string(),
      address: Yup.string(),
      description: Yup.string().min(100),
      role: Yup.string(),
      isPublish: Yup.boolean(),
      isForPCD: Yup.boolean(),
      synonymsArray: Yup.array().of(Yup.string()),
      requirements: Yup.string(),
      categoryofworker_id: Yup.number(),
      area_id: Yup.number(),
      seniority_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validação dos dados falhou! Verifique se os tipos de dados estão corretos.',
      })
    }

    const job = await Jobs.findOne({
      where: {
        id: jobID,
        factory_id: factoryID,
      },
    })

    const jobUpdated = await job.update(req.body)

    return res.json(jobUpdated)
  }
}

module.exports = new JobsController()
