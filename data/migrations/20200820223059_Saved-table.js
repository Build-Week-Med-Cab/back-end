
exports.up = function(knex) {
  return knex.schema.createTable('saved', tbl => {
    tbl.increments('id')
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl.string('strain').notNullable();
    tbl.string('strain_type').notNullable();
    tbl.text('description');
    tbl.json('effects');
    tbl.json('helps');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('saved')
};
