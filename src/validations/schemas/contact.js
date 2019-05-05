'use strict'

const Joi = require('joi')

module.exports = Joi.object().keys({
  fname: Joi.string(),
  lname: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  phone: Joi.number(),
})
