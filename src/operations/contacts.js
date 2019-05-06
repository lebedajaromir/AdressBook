'use strict'

const contactsRepository = require('./../repositories/contacts')
const errors = require('./../utils/errors')
const logger = require('./../utils/logger')

async function create(user, input) {
  const contact = {
    fname: input.fname,
    lname: input.lname,
    email: input.email.toLowerCase(),
    phone: input.phone,
  }
  const created = await contactsRepository.create(user, contact)

  return created
}

module.exports = {
  create,
}
