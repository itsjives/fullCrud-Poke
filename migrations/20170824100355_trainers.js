
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trainers', function(table){
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trainers');
};
