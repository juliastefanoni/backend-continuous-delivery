const App = require('./app')

require('dotenv').config()

App.server.listen(process.env.PORT)
