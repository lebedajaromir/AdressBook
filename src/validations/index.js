'use strict'

const Joi = require('joi')
const errors = require('./../utils/errors')

function validate(schema, text) {
  const { error } = Joi.validate(text, schema)
  if (error) {
    throw new errors.ValidationError(error)
  }
}

module.exports = {
  validate,
}

