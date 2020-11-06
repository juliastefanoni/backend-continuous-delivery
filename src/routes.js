const { Router } = require('express')

const routes = new Router()

routes.get('/user', (req, resp) => {
  return resp.json({ message: 'ok' })
})

module.exports = routes
