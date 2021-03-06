const { Router } = require('express')

const CategoryOfWorkerController = require('./app/controllers/CategoryOfWorkerController')
const SeniorityController = require('./app/controllers/SeniorityController')
const JobsController = require('./app/controllers/JobsController')
const SegmentController = require('./app/controllers/SegmentController')
const FactoryController = require('./app/controllers/FactoryController')
const AreaController = require('./app/controllers/AreaController')
const SessionController = require('./app/controllers/SessionController')

const authMiddleware = require('./app/middlewares/auth')

const routes = new Router()

// Criar sessão
routes.post('/session', SessionController.store)

// Rotas de regime de trabalho de vagas
routes.get('/workerCategory', CategoryOfWorkerController.index)
routes.post('/workerCategory', CategoryOfWorkerController.store)

// Rotas senioridade de vagas
routes.get('/seniority', SeniorityController.index)
routes.post('/seniority', SeniorityController.store)

// Rotas de areas de vagas
routes.get('/area', AreaController.index)
routes.post('/area', AreaController.store)

// Rotas segmento da empresa
routes.get('/segment', SegmentController.index)
routes.post('/segment', SegmentController.store)

// Listar vagas
routes.get('/jobs', JobsController.index)

// Listar empresas
routes.get('/factory', FactoryController.index)
routes.post('/factory', FactoryController.store)

routes.use(authMiddleware)

// Rotas de vagas
routes.post('/jobs', JobsController.store)
routes.put('/jobs/:jobID/factory/:factoryID', JobsController.update)

// Rotas empresa
routes.put('/factory/:factoryID', FactoryController.update)

module.exports = routes
