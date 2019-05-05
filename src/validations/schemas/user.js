'use strict'

const Joi = require('joi')

module.exports = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/u).required(),
  accessToken: [Joi.string().required(), Joi.number().required()],
}).without('password', 'access_token')

