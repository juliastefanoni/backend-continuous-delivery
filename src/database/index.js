const { Sequelize } = require('sequelize')

const databaseConfig = require('../config/database')

const CategoryOfWorker = require('../app/models/CategoryOfWorker')
const Seniority = require('../app/models/Seniority')
const Jobs = require('../app/models/Jobs')

const models = [CategoryOfWorker, Seniority, Jobs]
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

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

module.exports = new DataBase()
