const request = require('supertest');
const server = require('../data/server');
const db = require("../data/db-config");

let user = {}
let res = {}
let save = {}

describe('DB',() => {
  it("is using a test db", async () => {
    const response = await request(server).get('/')
    expect(process.env.DB_ENV).toBe("testing")
    expect(response.statusCode).toBe(200)
  })
})


describe("***Saved-router***", () => {
  
  beforeAll(async () => {
    await db('users').truncate();
    await db('saved').truncate();
    user = await request(server).post('/api/auth/register').send({username: "test", password: "test12345"})
  })

  describe('POST /', () => {
    beforeAll( async () => {
    save = {user_id: 1, strain: 'test strain', strain_type: "test type", description: 'test dec', effects: ['test effect'], helps: ['test helps']}
      res = await request(server).post('/api/saved/').send(save).set("Authorization", user.body.token)
    })
    it('should have a status code of 201', () => {
      expect(res.statusCode).toBe(201)
    })
    it('should be an object', () => {
      expect(res.type).toBe("application/json")
    })
    it('should equal object entered plus an id', () => {
      expect(res.body).toEqual({...save, id: 1})
    })
  })

  describe('GET /', () => {
    beforeAll(async () => {
      res = await request(server).get('/api/saved').set("Authorization", user.body.token)
    })
    it('should have status 200', () => {
      expect(res.statusCode).toBe(200)
    })
    it('should be an object', () => {
      expect(res.type).toBe("application/json")
    })
    it('should return an array with saved objects from user_id', () => {
      expect(res.body).toEqual([{ strain: 'test strain', strain_type: "test type", description: 'test dec', effects: ['test effect'], helps: ['test helps'], id: 1}])
    })
  })

  describe('DELETE /:id', () => {
    beforeAll( async () => {
      res = await request(server).delete('/api/saved/1').set("Authorization", user.body.token)
    })
    it("should have status code 200", () => {
      expect(res.body).toEqual({message: 'remove success'})
    })
    it('should be an object', () => {
      expect(res.type).toBe("application/json")
    })
    it("should be removed from the database", async () => {
      const data = await db('saved')
      expect(data).toEqual([])
    })
  })
})




