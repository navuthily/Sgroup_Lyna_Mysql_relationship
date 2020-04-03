
exports.up = (knex) => {
  return knex.schema.createTable('Products', (table) => {
    table.increments('id').primary();
    table.string('product_name', 255).notNullable();
    table.string('describe',255).notNullable();
    table.integer('price').notNullable();
    table.integer('product_type_id').unsigned()
                            .references('id')
                            .inTable('Product_type');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('Products');
};
