'use strict'

const path = require('path')
const config = require('./index')

module.exports = {
  client: 'pg',
  connection: { host: config.db.host, user: config.db.user, database: config.db.dbname },
  // connection: 'postgresql://postgres@localhost:5432/adressbook-users',
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, './../database/postgres/migrations'),
    // directory: './../database/postgres/migrations',

  },
  seeds: {
    directory: path.resolve(__dirname, './../database/postgres/seeds'),
    // directory: './../database/postgres/seeds',
  },
}
