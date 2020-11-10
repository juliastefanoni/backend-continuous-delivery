const App = require('./app')

require('dotenv').config()

console.log(`The server is available on http://localhost:${process.env.PORT}/`)

App.server.listen(process.env.PORT)
