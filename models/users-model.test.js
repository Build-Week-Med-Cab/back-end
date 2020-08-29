const db = require("../data/db-config");
const Users = require('./users-model');

let added = {}
let found = {}
describe('Users-Model', () => {
  beforeAll( async () => {
    await db('users').truncate()
  })

  describe('add function', () => {
    beforeAll(async () => {
      added = await Users.add({username: 'test', password: 'password'})
    })
    it('should add a user to the db and return a user with an id', () => {
      expect(added).toEqual({username: 'test', password: "password", id: 1})
    })
    it('should have 2 items returned after adding another.', async () => {
      await Users.add({username: 'test1', password: 'password'})

      const users = await Users.find()
      expect(users).toHaveLength(2)
    })
  })

  describe('findOneBy function', () => {
    beforeAll(async () => {
      found = await Users.findOneBy({id: 1})
    })
    it('should return one user object by id', ()=> {
      expect(found).toEqual({username: 'test', password: "password", id: 1})
    })
  })

})