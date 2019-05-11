'use strict'

const userRepository = require('./../repositories/users')
const errors = require('./../utils/errors')
const crypto = require('./../utils/crypto')
const logger = require('./../utils/logger')

async function login(input) {
  const user = await userRepository.findByEmail(input.email.toLowerCase())
  if (!user) {
    throw new errors.UnauthorizedError('user', input.email)
  }
  const verified = await crypto.comparePasswords(input.password, user.password)
  if (!verified || user.disabled) {
    throw new errors.UnauthorizedError()
  }
  const accessToken = await crypto.generateAccessToken(user.id)
  return {
    id: user.id,
    email: user.email,
    accessToken,
  }
}

async function register(input) {
  let user = await userRepository.findByEmail(input.email.toLowerCase())
  if (user) {
    throw new errors.ConflictError('user', input.email)
  }
  user = {
    email: input.email.toLowerCase(),
    password: await crypto.hashPassword(input.password),
  }
  const createdUser = await userRepository.create(user)
  createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)
  delete createdUser.password
  return createdUser
}

async function verifyTokenPayload(input) {
  logger.info({ input }, 'Start of verifyTokenPayload')
  let jwtPayload
  try {
    jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
  } catch (err) {
    throw new errors.UnauthorizedError()
  }
  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.UnauthorizedError()
  }
  const userId = jwtPayload.userId
  const user = await userRepository.findById(userId)
  if (!user) {
    throw new errors.UnauthorizedError()
  }
  logger.info('End of verifyTokenPayload')
  return {
    user,
    loginTimeout: jwtPayload.exp * 1000,
  }
}

module.exports = {
  login,
  register,
  verifyTokenPayload,
}
