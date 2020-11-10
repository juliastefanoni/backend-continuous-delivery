const { Router } = require('express')

const CategoryOfWorkerController = require('./app/controllers/CategoryOfWorkerController')
const SeniorityController = require('./app/controllers/SeniorityController')
const JobsController = require('./app/controllers/JobsController')

const routes = new Router()

routes.get('/workerCategory', CategoryOfWorkerController.index)
routes.post('/workerCategory', CategoryOfWorkerController.store)

routes.get('/seniority', SeniorityController.index)
routes.post('/seniority', SeniorityController.store)

routes.get('/jobs', JobsController.index)
routes.post('/jobs', JobsController.store)

module.exports = routes
