var dbCredentials = require('./config/config');
var env = 'production';

module.exports = {

  development: {
    client: 'pg',
    connection: {
        host     : process.env.DB_HOST || dbCredentials[env].host,
        port     : process.env.DB_PORT || dbCredentials[env].port,
        user     : process.env.DB_USER || dbCredentials[env].user,
        password : process.env.DB_PASSWORD || dbCredentials[env].password,
        database : process.env.DB_NAME || dbCredentials[env].database,
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
        host     : process.env.DB_HOST,
        port     : process.env.DB_PORT,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
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
