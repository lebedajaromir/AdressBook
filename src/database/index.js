'use strict'

const { Model } = require('objection')
const Knex = require('knex')
const firebase = require('firebase-admin')
const config = require('../config/knexfile')
const serviceAccount = require('./../../firebase-service-account.json')


async function connectUsersDB() {
  const knex = Knex(config)
  await knex.raw("SELECT '1=1';")
  Model.knex(knex)
}

function connectContactsDB() {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  })
}

async function truncateUsersDB(table) {
  const knex = Knex(config)
  await knex.raw(`truncate table ${table} cascade`)
}

async function seedUsersDB() {
  const knex = Knex(config)
  await knex.seed.run()
}


module.exports = {
  connectUsersDB,
  connectContactsDB,
  truncateUsersDB,
  seedUsersDB
}
