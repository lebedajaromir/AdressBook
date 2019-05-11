'use strict'

const util = require('util')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./../config')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

function generateAccessToken(userId) {
  const payload = { userId }
  return jwtSign(payload, config.auth.secret, config.auth.createOptions)
}

function verifyAccessToken(authToken) {
  try {
    return jwtVerify(authToken, config.auth.secret, config.auth.verifyOptions)
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
      return null
    }
    throw err
  }
}

function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}

function hashPassword(password) {
  return bcrypt.hash(pepperify(password), config.auth.saltRounds)
}

function comparePasswords(plaintext, ciphertext) {
  return bcrypt.compare(pepperify(plaintext), ciphertext)
}


module.exports = {
  generateAccessToken,
  verifyAccessToken,
  hashPassword,
  comparePasswords,
}

