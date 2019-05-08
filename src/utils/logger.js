'use strict'

const pino = require('pino')
const app = require('../../package.json')
const config = require('../config')


// custom generic logger
// async function logger(ctx, next) {
// pino.info(ctx.request)
// await next()
// pino.info(ctx.response)
// }


module.exports = pino({
  name: app.name,
  level: config.logger.minLevel,
  enabled: config.logger.enabled,
})

