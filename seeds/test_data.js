
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user').del(),
    knex('records').del(), 

    // Inserts users
    knex('user').insert({id:1, name:'one',type:10,about:'This is about that',password:'password'}),
    knex('user').insert({id:2, name:'two',type:5,about:'This is not about that but of this',password:'password'}),
    knex('user').insert({id:3, name:'three',type:0,about:"blah blah",password:'password'}),
    
    //insert record entries
    knex('records').insert({id:1, uid:1,name:'record one',info:"blah blah 1"}),
    knex('records').insert({id:2, uid:1,name:'record two',info:"blah blah 2"}),
    knex('records').insert({id:3, uid:2,name:'record three',info:"blah blah 3"}),
    knex('records').insert({id:4, uid:2,name:'record four',info:"blah blah 4"}),
    knex('records').insert({id:5, uid:3,name:'record five',info:"blah blah 5"}),
    knex('records').insert({id:6, uid:3,name:'record six',info:"blah blah 6"})
  );
};
