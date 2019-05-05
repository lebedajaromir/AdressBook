'use strict'

const router = require('koa-router')()
const contacts = require('./../controllers/contacts.js')
const { handleErrors } = require('./../middleware/errors')
const { authenticate } = require('./../middleware/authentication')

router.use(handleErrors)

router.post('/contacts', authenticate, contacts.create)

module.exports = router.routes()
