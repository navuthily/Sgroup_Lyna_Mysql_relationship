exports.up = (knex) => {
  return knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.string('fullname', 255).notNullable();
    table.string('username', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('admins');
};
