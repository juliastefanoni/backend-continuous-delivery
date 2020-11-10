const { Router } = require('express')

const CategoryOfWorkerController = require('./app/controllers/CategoryOfWorkerController')
const SeniorityController = require('./app/controllers/SeniorityController')

const routes = new Router()

routes.get('/workerCategory', CategoryOfWorkerController.index)
routes.post('/workerCategory', CategoryOfWorkerController.store)

routes.get('/seniority', SeniorityController.index)
routes.post('/seniority', SeniorityController.store)

module.exports = routes
