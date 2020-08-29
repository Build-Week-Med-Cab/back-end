const db = require('../data/db-config')
const Saved = require('./saved-model')

let added = {}
let foundOne = {}
const strain = {user_id: 1, strain: 'test strain', strain_type: "test type", description: 'test dec', effects: ['test effect'], helps: ['test helps']}

describe('Saved-Model', () => {
  beforeAll(async () => {
    await db('saved').truncate();
  })
  describe('add function', () => {
    beforeAll(async () => {
      added = await Saved.add(strain)
    })
    it('should return the object added with id added.', async () => {
      await expect(added).toEqual({...strain, id: 1, effects: "[\"test effect\"]", helps: "[\"test helps\"]"})
    })
  })
  describe('findOneBy function', () => {
    beforeAll(async () => {
      foundOne = await Saved.findOneBy({id: 1})
    })
    it('should return one baised on id', () => {
      expect(foundOne).toEqual({...strain, id: 1, effects: "[\"test effect\"]", helps: "[\"test helps\"]"})
    })
    
  })
  describe('findAllBy', () => {
    it('should return all by filter', async () => {
      await Saved.add(strain)

      const findAll = await Saved.findAllBy({user_id: 1})
      expect(findAll).toHaveLength(2)
    })
  })
})
