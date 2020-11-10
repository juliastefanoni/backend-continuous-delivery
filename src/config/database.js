require('dotenv').config()

module.exports = {
  use_env_variable: `${
    process.env.NODE_ENV === 'development'
      ? 'DATABASE_URL_DEVELOP'
      : 'DATABASE_URL'
  }`,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    modifyUnauthorized: false,
  },
  define: {
    timestamps: true,
    freezeTableName: true,
  },
}
