
exports.up = function(knex, Promise) {
   return knex.schema.createTable('user', function(table) {
    	table.increments('id').primary();
    	table.string('name');
    	table.integer('type');
    	table.string('about');
    	table.string('password');
  	});
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('user');
};
