/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict'

const { Model } = require('objection')
const Knex = require('knex')
const firebase = require('firebase-admin')
const knexConfig = require('../config/knexfile')
const config = require('./../config')

function connectUsersDB() {
  const knex = Knex(knexConfig)
  Model.knex(knex)
}

function connectContactsDB() {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      private_key: config.firestore.privateKey.replace(/\\n/gu, '\n'),
      project_id: config.firestore.projectId,
      client_email: config.firestore.clientEmail,
    }),
  })
}

// I could do this with migrations / seeding too

async function truncateUsersDB(table) {
  const knex = Knex(knexConfig)
  await knex.raw(`truncate table ${table} cascade`)
}

async function seedUsersDB() {
  const knex = Knex(knexConfig)
  await knex.seed.run()
}

module.exports = {
  connectUsersDB,
  connectContactsDB,
  truncateUsersDB,
  seedUsersDB,
}
