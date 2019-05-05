'use strict'

const router = require('koa-router')()
const users = require('./../controllers/users.js')
const { handleErrors } = require('./../middleware/errors')

router.use(handleErrors)

router.post('/session/user', users.login)
router.post('/users', users.register)

module.exports = router.routes()
