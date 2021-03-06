const db = require('../data/db-config');

module.exports = {
  add,
  findOneBy,
  find
}

function findOneBy(filter){
  return db('users').where(filter).first();
}

async function add(user){
  const [id] = await db('users').insert(user, 'id')
  return findOneBy({id: id});
}

function find(){
  return db('users')
}

