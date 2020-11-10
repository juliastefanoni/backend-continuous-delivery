const { Sequelize } = require('sequelize')

const databaseConfig = require('../config/database')

const CategoryOfWorker = require('../app/models/CategoryOfWorker')
const Seniority = require('../app/models/Seniority')

const models = [CategoryOfWorker, Seniority]
class DataBase {
  constructor() {
    this.init()
  }

  async init() {
    this.databaseURL = process.env[databaseConfig.use_env_variable]

    this.connection = new Sequelize(this.databaseURL, databaseConfig)

    try {
      await this.connection.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }

    models.map(model => model.init(this.connection))
  }
}

module.exports = new DataBase()
