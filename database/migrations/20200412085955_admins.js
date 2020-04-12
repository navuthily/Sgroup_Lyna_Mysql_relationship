exports.up = (knex) => {
  return knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.string('fullname', 255).notNullable();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.string('slug', 255).notNullable().unique()
  });
};
 
exports.down = (knex) => {
  return knex.schema.dropTable('admins');
};