const db = require('../data/db-config');

module.exports = {
  add,
  findById
}

async function add(user){
  const [id] = await db('users').insert(user)
  return await findById(id)
}

function findById(id){
  return db('users').where({id}).first();
}