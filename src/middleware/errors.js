'use strict'

const config = require('./../config')
const appErrors = require('./../utils/errors')
const logger = require('./../utils/logger')

async function handleErrors(ctx, next) {
  try {
    return await next()
  } catch (err) {
    let responseError = err
    if (!(err instanceof appErrors.DomainError)) {
      responseError = new appErrors.InternalError(err)
    }
    logger.info(responseError.message)
    const isDevelopment = ['local', 'test', 'dev'].includes(config.env)
    ctx.status = responseError.status
    ctx.body = {
      type: responseError.type,
      message: responseError.message,
      stack: isDevelopment && responseError.stack,
    }
    return true
  }
}

module.exports = {
  handleErrors,
}
