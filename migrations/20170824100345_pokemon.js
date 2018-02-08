
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('pokemon', function(table){
      table.increments();
      table.string('name');
      table.integer('cp').notNull().defaultTo(0);
      table.boolean('in_gym');
      table.integer('trainer_id');

    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pokemon');
};
