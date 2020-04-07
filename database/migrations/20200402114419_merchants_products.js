exports.up = (knex) => {
  return knex.schema.createTable('product_type', (table) => {
    table.increments('id').primary();
    table.string('product_type_name', 255).notNullable();
    table.foreign('user_id').unsigned()
      .references('id')
      .inTable('users');
  });
};
exports.down = (knex) => {
  return knex.schema.dropTable('product_type');
};