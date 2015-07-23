
exports.up = function(knex, Promise) {
   return knex.schema.createTable('records', function(table) {
    	table.increments('id').primary();
    	table.integer('uid');
    	table.string('name');
    	table.string('info');
  	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('records');
};
