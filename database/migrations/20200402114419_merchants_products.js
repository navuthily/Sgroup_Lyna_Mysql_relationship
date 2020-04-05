
exports.up = (knex) => {
  return knex.schema.createTable('Product_Type', (table) => {
    table.increments('id').primary();
    table.string('product_type_name', 255).notNullable();
    table.integer('user_id').unsigned()
                            .references('id')
                            .inTable('users');
  });
};
exports.down = (knex) => {
  return knex.schema.dropTable('Product_type');
};
