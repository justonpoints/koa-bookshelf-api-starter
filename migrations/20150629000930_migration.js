
exports.up = function(knex, Promise) {
   return knex.schema.createTable('user1', function(table) {
    	table.increments('id').primary();
    	table.string('name');
    	table.string('password');
  	});
};

exports.down = function(knex, Promise) {
  
};
