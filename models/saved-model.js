const db = require('../data/db-config');

module.exports = {
  add,
  findAllBy,
  removeById
}


function findOneBy(filter){
  return db('saved').where(filter).first();
}

function findAllBy(filter){
  return db('saved').where(filter).select("id", 'strain', 'strain_type', 'description', 'effects', 'helps')
}

async function add(rec){
  const [id] = await db('saved').insert({...rec, effects: JSON.stringify(rec.effects), helps: JSON.stringify(rec.helps)}, 'id')
  return findOneBy({id: id})
}

function removeById(id){
  return db('saved').where({id}).del()
}