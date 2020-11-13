const Segment = require('../models/Segment')

class SegmentController {
  async index(req, res) {
    const segments = await Segment.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
    })

    return res.json(segments)
  }

  async store(req, res) {
    const segment = req.body

    const { id, name } = await Segment.create(segment)

    return res.json({ id, name })
  }
}

module.exports = new SegmentController()
