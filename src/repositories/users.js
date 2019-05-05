'use strict'

const User = require('../database/postgres/models/user')

async function create(input) {
  const user = await User.query().insertAndFetch(input)
  return user
}

async function findByEmail(email) {
  const user = await User.query().where('email', email).first()
  return user
}

async function findById(id) {
  const user = await User.query().where('id', id).first()
  return user
}

module.exports = {
  create,
  findByEmail,
  findById,
}
