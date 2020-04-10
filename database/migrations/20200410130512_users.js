exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('fullname', 255).notNullable();
    table.string('username', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};
 
exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
