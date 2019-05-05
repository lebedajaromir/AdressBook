'use strict'

const Joi = require('joi')


module.exports = Joi.object().keys({
  jwtToken: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/u),
})
