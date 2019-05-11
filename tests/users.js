/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
'use strict'


const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../src/app').app
const { truncateUsersDB, seedUsersDB } = require('./../src/database/index')
const crypto = require('./../src/utils/crypto')

const { expect } = chai

let server

chai.use(chaiHttp)

describe('Testing Users', () => {
  before(async () => {
    await truncateUsersDB('users')
    await seedUsersDB()
    server = await app.start()
  })
  describe('POST /api/users', () => {
    it('should return 200 - user newly added', async () => {
      const response = await chai.request(server)
        .post('/api/users')
        .send({
          email: 'test123@test.com',
          password: 'test',
        })
      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.have.property('accessToken')
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('email')
    })
    it('should return 409 - conflict error - user exists', async () => {
      const response = await chai.request(server)
        .post('/api/users')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
      expect(response).to.have.status(409)
    })
    it('should return 400 - bad request / validation error - email missing', async () => {
      const response = await chai.request(server)
        .post('/api/users')
        .send({
          password: 'test',
        })
      expect(response).to.have.status(400)
    })
    it('should return 400 - bad request / validation error - password missing', async () => {
      const response = await chai.request(server)
        .post('/api/users')
        .send({
          email: 'test@test.com',
        })
      expect(response).to.have.status(400)
    })
  })
  describe('POST /api/session/user', () => {
    it('should return 200 - user is logged in (valid access_token returned)', async () => {
      const response = await chai.request(server)
        .post('/api/session/user')
        .send({
          email: 'test@test.com',
          password: 'pwd',
        })
      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.have.property('accessToken')
      const jwtPayload = await crypto.verifyAccessToken(response.body.accessToken)
      expect(jwtPayload && jwtPayload.exp && Date.now() < jwtPayload.exp * 1000).to.be.true
    })
    it('should return 401 - user is not logged in (wrong password)', async () => {
      const response = await chai.request(server)
        .post('/api/session/user')
        .send({
          email: 'test@test.com',
          password: 'wrongpd',
        })
      expect(response).to.have.status(401)
    })
  })
  after(async () => {
    await app.stop()
  })
})

