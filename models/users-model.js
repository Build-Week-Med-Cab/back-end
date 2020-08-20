const db = require('../data/db-config');

module.exports = {
  add,
  findById
}

function findById(id){
  return db('users').where({id: id}).first();
}

async function add(user){
  const [id] = await db('users').insert(user)
  return findById(id)
}

