var dbCredentials = require('./config/config');

module.exports = {

  development: {
    client: 'pg',
    connection: {
        host     : process.env.DB_HOST || dbCredentials.host,
        port     : process.env.DB_PORT || dbCredentials.port,
        user     : process.env.DB_USER || dbCredentials.user,
        password : process.env.DB_PASSWORD || dbCredentials.password,
        database : process.env.DB_NAME || dbCredentials.database,
        ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
        host     : process.env.DB_HOST || dbCredentials.host,
        port     : process.env.DB_PORT || dbCredentials.port,
        user     : process.env.DB_USER || dbCredentials.user,
        password : process.env.DB_PASSWORD || dbCredentials.password,
        database : process.env.DB_NAME || dbCredentials.database,
        ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
        host     : process.env.DB_HOST || dbCredentials.host,
        port     : process.env.DB_PORT || dbCredentials.port,
        user     : process.env.DB_USER || dbCredentials.user,
        password : process.env.DB_PASSWORD || dbCredentials.password,
        database : process.env.DB_NAME || dbCredentials.database,
        ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
