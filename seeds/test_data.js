
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user').del(), 

    // Inserts seed entries
    knex('user').insert({id: 1, name: 'one',type:10,password:"password"}),
    knex('user').insert({id: 2, name: 'two',type:5,password:"password"}),
    knex('user').insert({id: 3, name: 'three',type:0,password:"password"})
  );
};
