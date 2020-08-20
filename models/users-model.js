const db = require('../data/db-config');

module.exports = {
  add
}

function findOneBy(filter){
  return db('users').where(filter).first();
}

async function add(user){
  const id = await db('users').insert(user)
  console.log(id, "id error start")
  return findOneBy({id: id});
}

