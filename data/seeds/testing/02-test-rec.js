
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('saved').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('saved').insert([
        {user_id: 1, strain: 'test strain', strain_type: "test type", description: 'test dec', effects: ['test effect'], helps: ['test helps']}
      ]);
    });
};
