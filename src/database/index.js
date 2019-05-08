'use strict'

const { Model } = require('objection')
const Knex = require('knex')
const firebase = require('firebase-admin')
const knexConfig = require('../config/knexfile')
const config = require('./../config')
// const firestoreServiceAccount = require('./../../firebase-service-account.json')
const User = require('./postgres/models/user.js')

async function connectUsersDB() {
  const knex = Knex(knexConfig)
  Model.knex(knex)
}

function connectContactsDB() {
  // firebase.initializeApp({
  // credential: firebase.credential.cert(firestoreServiceAccount),
  // })
  firebase.initializeApp({
    credential: firebase.credential.cert({
      private_key: config.firestore.privateKey,
      project_id: config.firestore.projectId,
      client_email: config.firestore.clientEmail,

    }),
  })
}


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
