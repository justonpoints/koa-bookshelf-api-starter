
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user').del(), 

    // Inserts seed entries
    knex('user').insert({id: 1, name: 'one',password:"password"}),
    knex('user').insert({id: 2, name: 'two',password:"password"}),
    knex('user').insert({id: 3, name: 'three',password:"password"})
  );
};
