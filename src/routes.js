const { Router } = require('express')

const CategoryOfWorkerController = require('./app/controllers/CategoryOfWorkerController')
const SeniorityController = require('./app/controllers/SeniorityController')
const JobsController = require('./app/controllers/JobsController')
const SegmentController = require('./app/controllers/SegmentController')

const routes = new Router()

// Rotas de regime de trabalho de vagas
routes.get('/workerCategory', CategoryOfWorkerController.index)
routes.post('/workerCategory', CategoryOfWorkerController.store)

// Rotas senioridade de vagas
routes.get('/seniority', SeniorityController.index)
routes.post('/seniority', SeniorityController.store)

// Rotas de vagas
routes.get('/jobs', JobsController.index)
routes.post('/jobs', JobsController.store)

// Rotas segmento da empresa
routes.get('/segment', SegmentController.index)
routes.post('/segment', SegmentController.store)

module.exports = routes
