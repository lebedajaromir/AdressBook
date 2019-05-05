'use strict'

const operations = require('../operations/contacts')
const validator = require('../validations')
const schema = require('../validations/schemas/contact')

async function create(ctx, next) {
  const contact = {
    fname: ctx.request.body.fname,
    lname: ctx.request.body.lname,
    email: ctx.request.body.email,
    phone: ctx.request.body.phone,
  }
  validator.validate(schema, contact)
  ctx.body = await operations.create(ctx.state.user, ctx.request.body)
  next()
}

module.exports = {
  create,
}
