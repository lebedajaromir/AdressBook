'use strict'

module.exports = {
  server: {
    port: 3000,
  },
  logger: {
    enabled: false,
    stdout: true,
    minLevel: 'error',
  },
  db: {
    dbserver: 'localhost',
    dbname: 'addressbook-users-test',
    user: 'postgres',
  },
}
