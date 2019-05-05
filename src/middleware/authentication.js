'use strict'

const { validate } = require('../validations')
const operations = require('../operations/users')
const schema = require('../validations/schemas/jwtToken')
const errors = require('../utils/errors')

async function authenticate(ctx, next) {
  if (!ctx.header.authorization) {
    throw new errors.UnauthorizedError()
  }
  
  const input = { jwtToken: ctx.header.authorization }

  validate(schema, input)

  const data = await operations.verifyTokenPayload(input)

  if (ctx.response && data.loginTimeout) {
    ctx.set('Login-timeout', data.loginTimeout)
  }
  ctx.state.user = data.user
  return next()
}

module.exports = {
  authenticate,
}
