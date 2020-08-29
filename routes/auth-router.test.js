const request = require('supertest');
const server = require('../data/server');
const db = require("../data/db-config");

let res = {}
let req = {}
describe('Auth-Router', () => {
  beforeAll(async () => {
    await db('users').truncate();
  })

  describe('POST /register', () => {
    beforeAll( async () => {
      req = {username: 'test4', password: 'test12345'}
      res = await request(server).post('/api/auth/register').send(req)
    })
    it('should respond with a 201 code', () => {
    expect(res.statusCode).toBe(201)
    })
    it('should return a message welcoming by username', () => {
      expect(res.body.message).toBe('Welcome test4')
    })
    it('should return a token', () => {
      expect(res.body.token).toBeTruthy()
    })
  })

  describe('POST /login', () => {
    beforeAll(async () => {
      res = await request(server).post('/api/auth/login').send(req)
    })
    it('should return 200 code', () => {
      expect(res.statusCode).toBe(200)
    })
    it('should return a message welcoming by username', () => {
      expect(res.body.message).toBe('Welcome test4')
    })
    it('should return a token', () => {
      expect(res.body.token).toBeTruthy()
    })
  })
})