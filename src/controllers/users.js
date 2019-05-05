'use strict'

const operations = require('../operations/users')
const validator = require('../validations')
const schema = require('../validations/schemas/user')

async function login(ctx, next) {
  validator.validate(schema, ctx.request.body)
  const user = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  ctx.body = await operations.login(user)
  next()
}

async function register(ctx, next) {
  validator.validate(schema, ctx.request.body)
  const user = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  ctx.body = await operations.register(user)
  next()
}

module.exports = {
  login,
  register,
}

