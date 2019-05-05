/* eslint-disable max-classes-per-file */
'use strict'

// Custom errors implementation
// inspiration: STRV nodejs nights sample code and
// https://rclayton.silvrback.com/custom-errors-in-node-js

class DomainError extends Error {
  constructor(message, type, status) {
    super(message, type, status)
    this.name = this.constructor.name
    this.status = status
    this.type = type
    Error.captureStackTrace(this, this.constructor)
  }
}

class ResourceNotFoundError extends DomainError {
  constructor(resource, query) {
    super(`Resource ${resource} ${query} not found.`, 'NOT_FOUND', 404)
    this.data = { resource, query }
  }
}

class ValidationError extends DomainError {
  constructor(error) {
    super(error.message, 'BAD_REQUEST', 400)
    this.data = { error }
  }
}

class UnauthorizedError extends DomainError {
  constructor(error) {
    super('Unauthorized.', 'UNAUTHORIZED', 401)
    this.data = { error }
  }
}

class ConflictError extends DomainError {
  constructor(resource, query) {
    super(`Resource ${resource} ${query} already exists.`, 'CONFLICT', 409)
    this.data = { resource, query }
  }
}

class InternalError extends DomainError {
  constructor(error) {
    super(error.message, 'INTERNAL_ERROR', 500)
    this.data = { error }
  }
}

module.exports = {
  DomainError,
  ResourceNotFoundError,
  ValidationError,
  InternalError,
  UnauthorizedError,
  ConflictError,
}
